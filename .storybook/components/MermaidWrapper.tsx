import React, { useState, useEffect, useRef } from 'react';
import { CodeOrSourceMdx } from '@storybook/addon-docs/blocks';

import mermaid from 'mermaid';

export const MermaidWrapper = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [renderKey, setRenderKey] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const mermaidRef = useRef(null);
  const maxRetries = 3;

  // Inicjalizacja Mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'Arial, sans-serif',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true
      },
      sequence: {
        useMaxWidth: true
      },
      gantt: {
        useMaxWidth: true
      }
    });
  }, []);

  // Renderowanie wykresu Mermaid
  useEffect(() => {
    if (!props.className?.includes("mermaid") || !props.children) {
      return;
    }

    const chartCode = typeof props.children === 'string'
      ? props.children.trim()
      : props.children?.toString()?.trim() || '';

    if (!chartCode) {
      setError('Brak danych wykresu');
      return;
    }

    const renderMermaid = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Generuj unikalny ID dla każdego wykresu
        const diagramId = `mermaid-diagram-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Sprawdź czy element DOM jest dostępny
        if (!mermaidRef.current) {
          throw new Error('Element DOM nie jest dostępny');
        }

        // Wyczyść poprzedni wykres
        mermaidRef.current.innerHTML = '';

        // Renderuj nowy wykres
        const { svg } = await mermaid.render(diagramId, chartCode);

        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = svg;
          setRetryCount(0); // Reset retry counter po udanym renderowaniu
        }

      } catch (err) {
        console.error('Mermaid rendering error:', err);

        // Mechanizm ponownych prób
        if (retryCount < maxRetries) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            setRenderKey(prev => prev + 1);
          }, 1000 * (retryCount + 1)); // Zwiększaj opóźnienie z każdą próbą
        } else {
          setError(`Błąd renderowania wykresu: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Małe opóźnienie, aby upewnić się, że DOM jest gotowy
    const timeoutId = setTimeout(renderMermaid, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [props.children, props.className, renderKey, retryCount]);

  // Reset retry counter gdy zmienia się zawartość
  useEffect(() => {
    setRetryCount(0);
    setError(null);
  }, [props.children]);

  // Renderowanie komponentu
  if (props.className?.includes("mermaid")) {
    return (
      <div className="mermaid-wrapper" style={{ margin: '1rem 0' }}>
        {isLoading && (
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            color: '#666',
            border: '1px dashed #ccc',
            borderRadius: '4px'
          }}>
            <div>⏳ Ładowanie wykresu...</div>
            {retryCount > 0 && (
              <div style={{ fontSize: '0.8em', marginTop: '0.5rem' }}>
                Próba {retryCount + 1} z {maxRetries + 1}
              </div>
            )}
          </div>
        )}

        {error && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '4px',
            color: '#c33'
          }}>
            <strong>❌ {error}</strong>
            {retryCount >= maxRetries && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.9em' }}>
                <button
                  onClick={() => {
                    setRetryCount(0);
                    setRenderKey(prev => prev + 1);
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  🔄 Spróbuj ponownie
                </button>
              </div>
            )}
          </div>
        )}

        <div
          ref={mermaidRef}
          key={renderKey}
          className="mermaid-container"
          style={{
            display: isLoading || error ? 'none' : 'block',
            textAlign: 'center'
          }}
        />
      </div>
    );
  }

  // Fallback do standardowego komponentu kodu
  return React.createElement(CodeOrSourceMdx, props);
};

export default MermaidWrapper;
