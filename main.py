from recipe_scrapers import scrape_me
from firebase import firebase
import flask 

app = flask.Flask(__name__)

@app.route('/api/<url>', methods=['GET'])
def parseIntent(url):

    print(url)
    scraper = scrape_me(url)

    title = scraper.title()
    ingred = scraper.ingredients()

    firebase = firebase.FirebaseApplication("https://planty-bb6f2.firebaseio.com/", None)

    data = {'0': len(ingred)}
    for i in range(1, len(ingred) + 1):
        data.update({str(i): scraper.ingredients()[i - 1].split(",")[0]})
    # print (data)

    firebase.patch(title, data)
    return jsonify({'status': 'ok'}), 200


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3000)
