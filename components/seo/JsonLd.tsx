import * as React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
  id?: string;
}

/**
 * Safely renders Schema.org JSON-LD structured data.
 * Escapes closing script tags to prevent XSS vulnerability and syntax errors.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  if (!data) return null;

  const jsonString = JSON.stringify(data).replace(/<\/script>/gi, '<\\/script>');

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
