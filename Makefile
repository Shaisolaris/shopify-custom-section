.PHONY: dev validate
dev:
	shopify theme dev --store=your-store.myshopify.com
validate:
	python3 -c "import re,json,pathlib;[json.loads(m.group(1)) for p in pathlib.Path('sections').glob('*.liquid') for m in [re.search(r'schema.(.*?).endschema',p.read_text(),re.DOTALL)] if m];print('All schemas valid')"
