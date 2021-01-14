DROP TABLE IF EXISTS listings;

CREATE TABLE listings(
	id INTEGER NOT NULL PRIMARY KEY,
	source TEXT NOT NULL,
	address TEXT NOT NULL,
	zip_code INTEGER NOT NULL,
	link TEXT NOT NULL,
	price INTEGER,
	square_feet INTEGER,
	bed INTEGER,
	bath INTEGER,
	scrape_timestamp TIMESTAMP NOT NULL
);
