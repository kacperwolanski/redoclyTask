import React from "react";
import type { OpenApiDocument } from "../types/openApi";

interface Props {
  info: OpenApiDocument["info"];
}

const GeneralInfoParser: React.FC<Props> = ({ info }) => {
  if (!info) return null;

  const { title, version, description, termsOfService, contact, license } =
    info;

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>
        {title}{" "}
        {version && <span style={{ fontWeight: "normal" }}>({version})</span>}
      </h2>

      {description && <p style={{ maxWidth: 600 }}>{description}</p>}

      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          border: "1px solid #17171739",
          borderRadius: "8px",
          backgroundColor: "#454545ff",
          maxWidth: 600,
        }}
      >
        <h3 style={{ marginBottom: "0.5rem" }}>Overview Information</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: 1.6 }}>
          {termsOfService && (
            <li>
              <strong>Terms of Service:</strong>{" "}
              <a
                href={termsOfService}
                target="_blank"
                rel="noopener noreferrer"
              >
                {termsOfService}
              </a>
            </li>
          )}

          {contact && (
            <li>
              <strong>Contact:</strong>{" "}
              {contact.email && (
                <>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>{" "}
                </>
              )}
              {contact.url && (
                <>
                  |{" "}
                  <a
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Docs
                  </a>
                </>
              )}
            </li>
          )}

          {license && (
            <li>
              <strong>License:</strong>{" "}
              <a href={license.url} target="_blank" rel="noopener noreferrer">
                {license.name}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default GeneralInfoParser;
