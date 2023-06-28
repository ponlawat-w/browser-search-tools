.mode csv
.header on
.output ./search-tools.csv
SELECT short_name, keyword, url FROM keywords ORDER BY short_name;
