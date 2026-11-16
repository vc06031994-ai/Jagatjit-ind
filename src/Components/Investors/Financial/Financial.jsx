import { useState, useEffect, useMemo, useRef } from 'react';
import { client } from '../../../api/contentful.js';
import { FaRegFileAlt } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { groupFinancialReports } from './financialPeriods.js';
import { categoryKey, getDocumentDate, getFinancialCategories, loadFinancialReports } from './financialData.js';
import './Financial.css';

const QUARTERS = ['Apr – Jun', 'Jul – Sep', 'Oct – Dec', 'Jan – Mar'];

const Financial = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [category, setCategory] = useState('');
  const resultsRef = useRef(null);

  const selectCategory = (value) => {
    setCategory(value);
    // With many categories, take the reader straight to the chosen documents.
    requestAnimationFrame(() => {
      resultsRef.current?.focus({ preventScroll: true });
      resultsRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
  };

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    loadFinancialReports((query) => client.getEntries(query))
      .then((data) => { if (active) setReports(data); })
      .catch((reason) => {
        console.error('Unable to load financial documents:', reason);
        if (active) { setReports([]); setError(true); }
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [retry]);

  const categories = useMemo(() => getFinancialCategories(reports), [reports]);
  const filteredReports = useMemo(() => reports.filter((report) => !category
    || report.categories.some((value) => categoryKey(value) === category)), [reports, category]);
  const groups = useMemo(() => groupFinancialReports(filteredReports), [filteredReports]);
  const categoryLabel = categories.find((option) => option.key === category)?.label || 'All Documents';

  const openHtmlDocument = (report) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.opener = null;
      newWindow.document.write(report.html_content);
      newWindow.document.close();
    }
  };

  const renderDocument = (report, index) => {
    const available = Boolean(report.file_url || report.html_content);
    const date = getDocumentDate(report.file_date);
    const contents = <>
      <FaRegFileAlt className="fin-file-icon" aria-hidden="true" />
      <span className="fin-document-meta">
        <span className="fin-document-name">{report.file_name}</span>
        <span className={`fin-document-date${date ? '' : ' fin-date-missing'}`}>
          {date ? <><span className="fin-date-label">Document date: </span><time dateTime={date.dateTime}>{date.label}</time></> : 'Date not provided'}
        </span>
      </span>
      {available ? <span className="fin-open-label">View <FiArrowUpRight aria-hidden="true" /></span>
        : <span className="fin-missing-label">File unavailable</span>}
    </>;
    const label = `Open ${report.file_name}, ${date ? `document date ${date.label}` : 'date not provided'} (new tab)`;
    const key = report.id || `${report.file_name}-${index}`;
    if (report.file_url) return <a key={key} className="fin-document-link" href={report.file_url} target="_blank" rel="noopener noreferrer" aria-label={label}>{contents}</a>;
    if (report.html_content) return <button key={key} className="fin-document-link" type="button" onClick={() => openHtmlDocument(report)} aria-label={label}>{contents}</button>;
    return <div key={key} className="fin-document-link fin-document-unavailable">{contents}</div>;
  };

  const renderDocuments = (items) => items.length
    ? <div className="fin-document-list">{items.map(renderDocument)}</div>
    : <span className="fin-unavailable"><span aria-hidden="true">—</span><span className="fin-sr-only">No document listed</span></span>;

  const renderYearTable = (key, title, description, yearHeading) => groups[key].length > 0 && (
    <section className="fin-report-section" aria-labelledby={`fin-${key}-heading`} key={key}>
      <div className="fin-section-heading">
        <h3 id={`fin-${key}-heading`}>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="fin-table-wrap">
        <table className="fin-table fin-year-table">
          <caption className="fin-sr-only">{title}, newest reporting period first</caption>
          <thead><tr><th scope="col">{yearHeading}</th><th scope="col">Documents</th></tr></thead>
          <tbody>{groups[key].map((group) => (
            <tr key={group.year}><th scope="row">{group.year === 'Other' ? 'Not specified' : group.year}</th><td>{renderDocuments(group.items)}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </section>
  );

  return (
    <div className="financial-page">
      <div className="text-center food-hero our-process financial-hero">
        <h1 className="heading-top">Financial</h1>
        <p className="firstDivParagraph">Our yearly reports</p>
      </div>
      <main className="container fin-section">
        <div className="fin-category-header">
          <h2 id="fin-category-heading">Choose a category</h2>
          <p>Select a category below, then open the document you need.</p>
        </div>
        <div className="fin-categories" role="group" aria-labelledby="fin-category-heading">
          <button type="button" className={`fin-category-button ${!category ? 'is-active' : ''}`} aria-pressed={!category} aria-controls="fin-results" onClick={() => selectCategory('')}>All Documents</button>
          {categories.map((option) => (
            <button key={option.key} type="button" className={`fin-category-button ${category === option.key ? 'is-active' : ''}`} aria-pressed={category === option.key} aria-controls="fin-results" onClick={() => selectCategory(option.key)}>{option.label}</button>
          ))}
        </div>

        <div id="fin-results" className="fin-results" ref={resultsRef} tabIndex={-1} role="region" aria-label="Financial documents" aria-busy={loading}>
          {loading ? (
            <div className="fin-state" role="status"><span className="fin-spinner" aria-hidden="true" /><p>Loading all financial documents…</p></div>
          ) : error ? (
            <div className="fin-state" role="alert">
              <h2>Documents could not be loaded</h2>
              <p>Please try again. No sample or incomplete documents are shown.</p>
              <button type="button" className="fin-category-button" onClick={() => setRetry((value) => value + 1)}>Try Again</button>
            </div>
          ) : (
            <>
              <div className="fin-results-heading">
                <h2>{categoryLabel}</h2>
                <p role="status">{filteredReports.length} {filteredReports.length === 1 ? 'document' : 'documents'} · Documents open in a new tab</p>
              </div>
              {filteredReports.length === 0 && <div className="fin-state"><h3>No documents available</h3><p>Documents will appear here when published.</p></div>}
              {renderYearTable('annual', 'Annual Reports', 'Reports arranged by their stated financial year, newest first.', 'Financial Year')}
              {renderYearTable('filings', 'Annual Returns / MGT Filings', 'MGT filings are listed separately from annual reports. Years are shown as stated in the document.', 'Year / Period')}
              {groups.quarterly.length > 0 && (
                <section className="fin-report-section" aria-labelledby="fin-quarterly-heading">
                  <div className="fin-section-heading">
                    <h3 id="fin-quarterly-heading">Quarterly Documents</h3>
                    <p>Financial year: April to March. Select a date to open a document. A dash means no document is listed.</p>
                    <p className="fin-date-note">Dates shown are document dates from our archive and may differ from quarter-end dates.</p>
                  </div>
                  <div className="fin-table-wrap fin-quarter-desktop" role="region" aria-label="Documents by financial year and quarter" tabIndex={0}>
                    <table className="fin-table fin-quarter-table">
                      <caption className="fin-sr-only">Quarterly documents, newest financial year first</caption>
                      <thead><tr><th scope="col">Financial Year</th>{QUARTERS.map((months, index) => <th scope="col" key={months}>Q{index + 1}<span className="fin-quarter-months">{months}</span></th>)}</tr></thead>
                      <tbody>{groups.quarterly.map((group) => <tr key={group.year}><th scope="row">{group.year}</th>{group.quarters.map((items, index) => <td key={index}>{renderDocuments(items)}</td>)}</tr>)}</tbody>
                    </table>
                  </div>
                  <div className="fin-quarter-mobile">
                    {groups.quarterly.map((group) => <div className="fin-quarter-year" key={group.year}>
                      <h4>Financial Year {group.year}</h4>
                      <dl>{group.quarters.map((items, index) => <div className="fin-quarter-entry" key={index}><dt>Q{index + 1}<span>{QUARTERS[index]}</span></dt><dd>{renderDocuments(items)}</dd></div>)}</dl>
                    </div>)}
                  </div>
                </section>
              )}
              {renderYearTable('documents', 'Other Documents', 'All remaining documents, including those without a clearly stated quarter. No documents are hidden.', 'Year / Period')}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Financial;
