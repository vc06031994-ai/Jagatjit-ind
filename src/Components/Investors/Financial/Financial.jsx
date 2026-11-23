import { useState, useEffect, useMemo, useRef } from 'react';
import { client } from '../../../api/contentful.js';
import { Link, useSearchParams } from 'react-router-dom';
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { groupFinancialReports } from './financialPeriods.js';
import { categoryKey, getDocumentDate, loadFinancialReports } from './financialData.js';
import { buildFinancialCatalog, getDefaultFinancialCategory, resolveFinancialView } from './financialCatalog.js';
import { openHtmlDocument } from './openHtmlDocument.js';
import './Financial.css';

const QUARTERS = ['Apr – Jun', 'Jul – Sep', 'Oct – Dec', 'Jan – Mar'];
const categoryHref = (key) => `?category=${encodeURIComponent(key)}`;

const Financial = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [searchParams] = useSearchParams();
  const category = categoryKey(searchParams.get('category') || '');
  const showAll = searchParams.get('view') === 'all';
  const viewKey = category || (showAll ? 'all' : 'default');
  const contentRef = useRef(null);
  const sectionRef = useRef(null);
  const navigationRef = useRef(null);
  const previousView = useRef(viewKey);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  const catalog = useMemo(() => buildFinancialCatalog(reports), [reports]);
  const selectedCategory = category || (!showAll ? getDefaultFinancialCategory(catalog) : '');
  const view = useMemo(() => resolveFinancialView(catalog, reports, { category, all: showAll }), [catalog, reports, category, showAll]);
  const filteredReports = view.reports;
  const groups = useMemo(() => groupFinancialReports(filteredReports), [filteredReports]);

  useEffect(() => {
    if (loading || error || previousView.current === viewKey) return;
    previousView.current = viewKey;
    contentRef.current?.focus({ preventScroll: true });
    sectionRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [viewKey, loading, error]);

  useEffect(() => {
    const navigation = navigationRef.current;
    if (!navigation) return;
    const update = () => {
      setCanScrollLeft(navigation.scrollLeft > 2);
      setCanScrollRight(navigation.scrollLeft + navigation.clientWidth < navigation.scrollWidth - 2);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(navigation);
    navigation.addEventListener('scroll', update, { passive: true });
    return () => { observer.disconnect(); navigation.removeEventListener('scroll', update); };
  }, [catalog]);

  useEffect(() => {
    // Keep the selected item visible after direct navigation or browser Back.
    const navigation = navigationRef.current;
    const selected = navigation?.querySelector('[aria-current="page"]');
    if (!selected) return;
    const left = selected.offsetLeft;
    const right = left + selected.offsetWidth;
    if (left < navigation.scrollLeft) navigation.scrollLeft = left;
    else if (right > navigation.scrollLeft + navigation.clientWidth) navigation.scrollLeft = right - navigation.clientWidth;
  }, [viewKey, catalog]);

  const scrollCategories = (direction) => {
    const navigation = navigationRef.current;
    if (navigation) navigation.scrollBy({ left: direction * navigation.clientWidth * 0.75, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  const renderDocument = (report, index) => {
    const available = Boolean(report.file_url || report.html_content);
    const date = getDocumentDate(report.file_date);
    const contents = <>
      <svg className="fin-pdf-icon" viewBox="0 0 24 32" aria-hidden="true" focusable="false">
        <path fill="#ed2027" d="M4 0h11l9 9v19a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Z" />
        <path fill="#f36a6f" d="M15 0v9h9Z" />
        <text x="12" y="24" fill="#fff" fontFamily="Arial, sans-serif" fontSize="8.5" fontWeight="700" textAnchor="middle">PDF</text>
      </svg>
      <span className="fin-document-name fin-sr-only">{report.file_name}</span>
      <span className={`fin-document-date${date ? '' : ' fin-date-missing'}`}>
        {date ? <time dateTime={date.dateTime}>{date.label}</time> : 'Date not provided'}
      </span>
      {!available && <span className="fin-missing-label">File unavailable</span>}
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
      <header className="text-center food-hero our-process financial-hero">
        <h1 className="heading-top">Financial</h1>
        <p className="firstDivParagraph">Our yearly reports</p>
      </header>
      <main className="container fin-section" ref={sectionRef}>
        {!loading && !error && catalog.length > 0 && (
          <nav className="fin-category-navigation" aria-label="Investor categories">
            <button className="fin-nav-scroll" type="button" aria-label="Previous categories" aria-controls="fin-category-links" disabled={!canScrollLeft} onClick={() => scrollCategories(-1)}><FiChevronLeft aria-hidden="true" /></button>
            <div id="fin-category-links" className="fin-category-links" ref={navigationRef}>
              <Link to="?view=all" className={`fin-category-button ${!selectedCategory ? 'is-active' : ''}`} aria-current={!selectedCategory ? 'page' : undefined}>All Documents</Link>
              {catalog.map((option) => (
                <Link key={option.key} to={categoryHref(option.key)} className={`fin-category-button ${selectedCategory === option.key ? 'is-active' : ''}`} aria-current={selectedCategory === option.key ? 'page' : undefined}>{option.label}</Link>
              ))}
            </div>
            <button className="fin-nav-scroll" type="button" aria-label="Next categories" aria-controls="fin-category-links" disabled={!canScrollRight} onClick={() => scrollCategories(1)}><FiChevronRight aria-hidden="true" /></button>
          </nav>
        )}

        <div ref={contentRef} className="fin-content" tabIndex={-1}>
          {selectedCategory && <Link to="?view=all" className="fin-back-link"><FiArrowLeft aria-hidden="true" /> Back to All Documents</Link>}
          <header className="fin-page-heading">
            <h2>{loading || error ? 'Investors' : view.label}</h2>
          </header>
          <div id="fin-results" className="fin-results" role="region" aria-label="Financial documents" aria-busy={loading}>
            {loading ? (
              <div className="fin-state" role="status"><span className="fin-spinner" aria-hidden="true" /><p>Loading all financial documents…</p></div>
            ) : error ? (
              <div className="fin-state" role="alert">
                <h2>Documents could not be loaded</h2>
                <p>Please try again. No sample or incomplete documents are shown.</p>
                <button type="button" className="fin-category-button" onClick={() => setRetry((value) => value + 1)}>Try Again</button>
              </div>
            ) : view.type === 'not-found' ? (
              <div className="fin-state"><h2>This category is not available</h2><p>Please choose a category from the tabs above, or view all documents.</p><Link className="fin-category-button" to="?view=all">View All Documents</Link></div>
            ) : (
              <>
                <div className="fin-results-heading">
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
        </div>
      </main>
    </div>
  );
};

export default Financial;
