import React, { useState } from 'react';
import { Upload, FileText, Search, AlertCircle, CheckCircle2, Download } from 'lucide-react'
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [replacement, setReplacement] = useState('');
  const [tableData, setTableData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to process.');
      return;
    }
    if (!prompt.trim()) {
      setError('Please enter a processing instruction.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('natural_prompt', prompt);
    formData.append('replacement_value', replacement);

    try {
      // Replace this with your actual axios call
      
      const response = await axios.post(
        'http://localhost:8000/api/process/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      
      // Simulated response - remove this and uncomment above
      // const response = await new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve({
      //       data: {
      //         columns: ['Name', 'Email', 'Phone'],
      //         rows: [
      //           { Name: 'John Doe', Email: 'REDACTED', Phone: '555-0123' },
      //           { Name: 'Jane Smith', Email: 'REDACTED', Phone: '555-0456' }
      //         ],
      //         download_url: 'http://localhost:8000/api/download/processed_file_123.csv'
      //       }
      //     });
      //   }, 1500);
      // });

      setTableData(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while processing the file.');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    mainWrapper: {
      maxWidth: '1024px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    headerIcon: {
      backgroundColor: '#4f46e5',
      padding: '12px',
      borderRadius: '50%',
      display: 'inline-flex',
      marginBottom: '1rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '0 0 0.5rem 0'
    },
    subtitle: {
      color: '#6b7280',
      margin: 0
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
      marginBottom: '1.5rem'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    fileUploadArea: {
      border: '2px dashed #d1d5db',
      borderRadius: '8px',
      padding: '2rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      backgroundColor: '#fafafa',
      display: 'block',
      width: '100%',
      boxSizing: 'border-box'
    },
    fileUploadAreaActive: {
      borderColor: '#818cf8',
      backgroundColor: '#f0f4ff'
    },
    hiddenInput: {
      display: 'none'
    },
    selectedFile: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#4f46e5',
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)'
    },
    helpText: {
      fontSize: '0.75rem',
      color: '#6b7280',
      marginTop: '0.25rem'
    },
    button: {
      width: '100%',
      backgroundColor: '#4f46e5',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontSize: '1rem'
    },
    buttonHover: {
      backgroundColor: '#4338ca'
    },
    buttonDisabled: {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed'
    },
    spinner: {
      border: '2px solid transparent',
      borderTop: '2px solid white',
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      animation: 'spin 1s linear infinite'
    },
    errorCard: {
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem'
    },
    errorTitle: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#dc2626',
      margin: '0 0 0.25rem 0'
    },
    errorText: {
      fontSize: '0.875rem',
      color: '#dc2626',
      margin: 0
    },
    resultsCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    },
    resultsHeader: {
      padding: '1.5rem',
      borderBottom: '1px solid #e5e7eb'
    },
    downloadButton: {
      backgroundColor: '#10b981',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      textDecoration: 'none'
    },
    downloadButtonHover: {
      backgroundColor: '#059669'
    },
    resultsTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      margin: '0 0 0.25rem 0',
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#1f2937'
    },
    resultsSubtitle: {
      fontSize: '0.875rem',
      color: '#6b7280',
      margin: 0
    },
    tableContainer: {
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      backgroundColor: '#f9fafb',
      padding: '0.75rem 1.5rem',
      textAlign: 'left',
      fontSize: '0.75rem',
      fontWeight: '500',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    td: {
      padding: '1rem 1.5rem',
      borderTop: '1px solid #e5e7eb',
      fontSize: '0.875rem',
      color: '#1f2937'
    },
    tr: {
      transition: 'background-color 0.2s'
    },
    trHover: {
      backgroundColor: '#f9fafb'
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .spinner {
            animation: spin 1s linear infinite;
          }
        `}
      </style>
      
      <div style={styles.mainWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerIcon}>
            <Search size={24} color="white" />
          </div>
          <h1 style={styles.title}>Regex Processor</h1>
          <p style={styles.subtitle}>Upload your file and describe what you want to find and replace</p>
        </div>

        {/* Main Form Card */}
        <div style={styles.card}>
          <div>
            {/* File Upload Section */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Upload File</label>
              <div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={styles.hiddenInput}
                  id="file-upload"
                  accept=".csv,.xlsx,.xls"
                />
                <label
                  htmlFor="file-upload"
                  style={styles.fileUploadArea}
                  onMouseEnter={(e) => {
                    if (!file) {
                      e.currentTarget.style.borderColor = '#818cf8';
                      e.currentTarget.style.backgroundColor = '#f0f4ff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!file) {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.backgroundColor = '#fafafa';
                    }
                  }}
                >
                  {file ? (
                    <div style={styles.selectedFile}>
                      <FileText size={20} color="#4f46e5" />
                      <span style={{ color: '#374151', fontSize: '0.875rem' }}>{file.name}</span>
                      <CheckCircle2 size={16} color="#10b981" />
                    </div>
                  ) : (
                    <div>
                      <Upload size={32} color="#9ca3af" style={{ margin: '0 auto 0.5rem auto', display: 'block' }} />
                      <p style={{ margin: '0 0 0.25rem 0', color: '#6b7280', fontSize: '0.875rem' }}>
                        Click to upload or drag and drop
                      </p>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af' }}>
                        CSV, XLSX, XLS files supported
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Processing Instructions */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Processing Instructions</label>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., find emails in Email column"
                style={styles.input}
              />
              <p style={styles.helpText}>
                Describe what pattern you want to find in natural language
              </p>
            </div>

            {/* Replacement Value */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Replacement Value (Optional)</label>
              <input
                type="text"
                value={replacement}
                onChange={(e) => setReplacement(e.target.value)}
                placeholder="e.g., REDACTED"
                style={styles.input}
              />
              <p style={styles.helpText}>
                Leave empty to just find matches without replacing
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !file || !prompt.trim()}
              style={{
                ...styles.button,
                ...(loading || !file || !prompt.trim() ? styles.buttonDisabled : {})
              }}
            >
              {loading ? (
                <>
                  <div style={styles.spinner} className="spinner"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Search size={16} />
                  <span>Process File</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={styles.errorCard}>
            <AlertCircle size={20} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h3 style={styles.errorTitle}>Error</h3>
              <p style={styles.errorText}>{error}</p>
            </div>
          </div>
        )}

        {/* Results Table */}
        {tableData && (
          <div style={styles.resultsCard}>
            <div style={styles.resultsHeader}>
              <div style={styles.resultsActions}>
                <div>
                  <h2 style={styles.resultsTitle}>
                    <CheckCircle2 size={20} color="#10b981" />
                    Processing Results
                  </h2>
                  <p style={styles.resultsSubtitle}>
                    Found {tableData.rows.length} rows with {tableData.columns.length} columns
                  </p>
                </div>
                {tableData.download_url && (
                  <a
                    href={tableData.download_url}
                    download
                    style={styles.downloadButton}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = styles.downloadButtonHover.backgroundColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = styles.downloadButton.backgroundColor;
                    }}
                  >
                    <Download size={16} />
                    Download Results
                  </a>
                )}
              </div>
            </div>
            
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {tableData.columns.map((col) => (
                      <th key={col} style={styles.th}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.rows.map((row, idx) => (
                    <tr 
                      key={idx} 
                      style={styles.tr}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {tableData.columns.map((col) => (
                        <td key={col} style={styles.td}>
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
