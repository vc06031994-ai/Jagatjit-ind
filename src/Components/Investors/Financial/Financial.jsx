import React, { useState, useEffect, useMemo } from 'react';
import { client } from '../../../api/contentful.js';
import { FaFilePdf } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import samplePdf from '../../../Assets/Files/Quarterly Results - December, 2024.pdf';
import "./Financial.css";

// Sample documents shown only when Contentful is not configured
// (e.g. local preview without .env.local keys). Live data from
// Contentful always takes priority when available.
const SAMPLE_REPORTS = [
  { file_name: 'Annual Report 2025-26', category_name: 'Annual Reports', file_description: 'Audited annual report for FY 2025-26', file_date: '2026-03-31', file_url: samplePdf, html_content: '', created_at: '2026-03-31T00:00:00Z' },
  { file_name: 'Quarterly Results - December 2025', category_name: 'Quarterly Results', file_description: 'Unaudited financial results for Q3 FY 2025-26', file_date: '2025-12-31', file_url: samplePdf, html_content: '', created_at: '2025-12-31T00:00:00Z' },
  { file_name: 'Quarterly Results - September 2025', category_name: 'Quarterly Results', file_description: 'Unaudited financial results for Q2 FY 2025-26', file_date: '2025-09-30', file_url: samplePdf, html_content: '', created_at: '2025-09-30T00:00:00Z' },
  { file_name: 'Annual Report 2024-25', category_name: 'Annual Reports', file_description: 'Audited annual report for FY 2024-25', file_date: '2025-03-31', file_url: samplePdf, html_content: '', created_at: '2025-03-31T00:00:00Z' },
  { file_name: 'Quarterly Results - December 2024', category_name: 'Quarterly Results', file_description: 'Unaudited financial results for Q3 FY 2024-25', file_date: '2024-12-31', file_url: samplePdf, html_content: '', created_at: '2024-12-31T00:00:00Z' },
  { file_name: 'Quarterly Results - September 2024', category_name: 'Quarterly Results', file_description: 'Unaudited financial results for Q2 FY 2024-25', file_date: '2024-09-30', file_url: samplePdf, html_content: '', created_at: '2024-09-30T00:00:00Z' },
  { file_name: 'Annual Report 2023-24', category_name: 'Annual Reports', file_description: 'Audited annual report for FY 2023-24', file_date: '2024-03-31', file_url: samplePdf, html_content: '', created_at: '2024-03-31T00:00:00Z' },
  { file_name: 'Annual Report 2022-23', category_name: 'Annual Reports', file_description: 'Audited annual report for FY 2022-23', file_date: '2023-03-31', file_url: samplePdf, html_content: '', created_at: '2023-03-31T00:00:00Z' },
];

const Financial = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingSample, setUsingSample] = useState(false);
  const [category, setCategory] = useState(''); // '' means All

  const parseRichText = (node) => {
    if (!node) return '';
    if (node.nodeType === 'text') {
      return node.value;
    }
    if (node.content && Array.isArray(node.content)) {
      return node.content.map(parseRichText).join('');
    }
    return '';
  };

  useEffect(() => {
    const fetchAllEntries = async () => {
      try {
        let allEntries = [];
        let skip = 0;
        let total = 0;

        do {
          const response = await client.getEntries({
            content_type: 'financialPage',
            limit: 100, // Maximum allowed by Contentful API
            skip,
          });

          total = response.total; // Total number of entries
          skip += response.items.length; // Increment skip by the number of items fetched
          allEntries = [...allEntries, ...response.items]; // Merge new entries into the array
        } while (skip < total);

        const data = allEntries.map((item) => ({
          file_name: item.fields.fileName,
          category_name: item.fields.categoryName,
          file_description: item.fields.fileDescription,
          file_date: item.fields.fileDate,
          file_url: item.fields.fileUrl?.fields?.file?.url || null,
          html_content: parseRichText(item.fields.htmlfield),
          created_at: item.sys.createdAt, // Adding createdAt property
        })).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by creation date

        setReports(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        // Contentful not configured (no .env.local keys) — fall back to
        // sample data so the page layout can still be previewed.
        setReports(SAMPLE_REPORTS);
        setUsingSample(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEntries();
  }, []);

  const getYear = (report) => {
    const year = new Date(report.file_date).getFullYear();
    return isNaN(year) ? 'Other' : year;
  };

  // Unique categories for the pills
  const categories = useMemo(() => {
    return [...new Set(reports.map((r) => r.category_name).filter(Boolean))].sort();
  }, [reports]);

  // Filter by selected category pill only (kept simple for easy use)
  const filteredReports = useMemo(() => {
    return reports.filter((report) => !category || report.category_name === category);
  }, [reports, category]);

  // Group filtered reports by year (Milk Food style), newest year first
  const groupedReports = useMemo(() => {
    const groups = new Map();
    filteredReports.forEach((report) => {
      const year = getYear(report);
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(report);
    });
    return [...groups.entries()]
      .sort((a, b) => {
        if (a[0] === 'Other') return 1;
        if (b[0] === 'Other') return -1;
        return b[0] - a[0];
      })
      .map(([year, items]) => ({
        year,
        items: items.sort((a, b) => new Date(b.file_date) - new Date(a.file_date)),
      }));
  }, [filteredReports]);

  const formatDate = (value) => {
    const date = new Date(value);
    if (isNaN(date)) return '—';
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleReportClick = (report) => {
    if (report.file_url) {
      window.open(report.file_url, '_blank', 'noopener,noreferrer'); // Directly open the file URL in a new tab
    } else if (report.html_content) {
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.opener = null;
        newWindow.document.write(report.html_content);
        newWindow.document.close();
      }
    }
  };

  return (
    <>
      <div className="text-center food-hero our-process financial-hero">
        <h1 className="heading-top">Financial</h1>
        <p className="firstDivParagraph">Our yearly reports</p>
      </div>

      <div className="container fin-section">
        {/* ---------- Category Pills (simple, Milk Food style) ---------- */}
        <div className="fin-cat-row">
          <span className="fin-cat-label">Category:</span>
          <div className="fin-pills">
            <button
              type="button"
              className={`fin-pill ${category === '' ? 'active' : ''}`}
              aria-pressed={category === ''}
              onClick={() => setCategory('')}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`fin-pill ${category === cat ? 'active' : ''}`}
                aria-pressed={category === cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {usingSample && (
          <p className="fin-sample-note">
            Preview mode: Contentful is not configured, so sample documents are shown.
            Add <code>VITE_CONTENTFUL_SPACE_ID</code> and <code>VITE_CONTENTFUL_ACCESS_TOKEN</code> in <code>.env.local</code> to load live data.
          </p>
        )}

        {/* ---------- Results: Year-grouped Table ---------- */}
        {loading ? (
          <div className="fin-loading">
            <span className="fin-spinner"></span>
            <p>Loading documents...</p>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="fin-table-wrap">
            <table className="fin-table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Date</th>
                  <th scope="col">View</th>
                </tr>
              </thead>
              <tbody>
                {groupedReports.map((group) => (
                  <React.Fragment key={group.year}>
                    <tr className="fin-year-row-header">
                      <td colSpan="3">
                        <span className="fin-year-badge">{group.year}</span>
                        <span className="fin-year-count">
                          {group.items.length} {group.items.length === 1 ? 'document' : 'documents'}
                        </span>
                      </td>
                    </tr>
                    {group.items.map((report, idx) => (
                      <tr
                        key={`${group.year}-${idx}`}
                        className="fin-doc-row"
                        onClick={() => handleReportClick(report)}
                      >
                        <td className="fin-doc-cell">
                          <span className="fin-doc-icon"><FaFilePdf /></span>
                          <span className="fin-doc-meta">
                            <span className="fin-doc-name">{report.file_name}</span>
                            {report.file_description && (
                              <span className="fin-doc-desc">{report.file_description}</span>
                            )}
                          </span>
                        </td>
                        <td className="fin-date">{formatDate(report.file_date)}</td>
                        <td className="fin-action">
                          <button
                            type="button"
                            className="fin-view-btn"
                            aria-label={`View ${report.file_name}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleReportClick(report);
                            }}
                          ><FiEye aria-hidden="true" /> View</button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="fin-empty">
            <FaFilePdf className="fin-empty-icon" />
            <h3>No documents found</h3>
            <p>No documents are available in this category yet.</p>
            <button type="button" className="fin-pill active" onClick={() => setCategory('')}>
              View All Documents
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Financial;
