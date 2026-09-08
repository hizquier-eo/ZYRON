CREATE TABLE IF NOT EXISTS diplomas (
  public_id TEXT PRIMARY KEY,
  number TEXT NOT NULL UNIQUE,
  holder TEXT NOT NULL,
  course TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  status TEXT NOT NULL,
  id_number_hash TEXT NOT NULL,
  access_code_hash TEXT NOT NULL,
  verification_code TEXT NOT NULL UNIQUE,
  diploma_path TEXT NOT NULL
);

INSERT OR IGNORE INTO diplomas
(public_id, number, holder, course, issue_date, status, id_number_hash, access_code_hash, verification_code, diploma_path)
VALUES
('zyr_01HENRY0001VLD9', '0001', 'Dr. Henry Izquierdo', 'Inteligencia Artificial Generativa y Agentes — Nivel Avanzado', '08/09/2026', 'VÁLIDO', '1f7d383f0c63f8dfc4e53164214452c3aa64066088ad75ef15805210a438cbd2', 'da12ca67cfe99b35405df17db5c28f9916869a400d52607ec746e1553671458b', 'ZYR-0001-7KQ9', '/assets/diploma-0001.pdf');
