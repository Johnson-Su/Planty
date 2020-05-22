from recipe_scrapers import scrape_me

# give the url as a string, it can be url from any site listed below
scraper = scrape_me('https://www.allrecipes.com/recipe/158968/spinach-and-feta-turkey-burgers/')

print(scraper.title())


ing = scraper.ingredients()
for item in ing:
    print(item.split(",")[0]) 

scraper.image()
scraper.links()