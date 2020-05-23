from recipe_scrapers import scrape_me
from firebase import firebase

# give the url as a string, it can be url from any site listed below
scraper = scrape_me('https://www.allrecipes.com/recipe/8814/homemade-chicken-soup/')

title = scraper.title()

ingred = scraper.ingredients()

firebase = firebase.FirebaseApplication("https://planty-bb6f2.firebaseio.com/", None)

# data = {'0': len(ingred)}
# for i in range(1, len(ingred) + 1):
#     data.update({str(i): scraper.ingredients()[i - 1].split(",")[0]})
# print (data)

firebase.patch(title, data)
test = firebase.get(title, "ingredient")
print(test)

test_values = next(iter(test.values()))
print(test_values[0])


