from flask import Blueprint, render_template, request
import requests, json


homepage_router = Blueprint(__name__, 'homepage')

@homepage_router.route('/api/', methods=['GET'])
def index_get():
    r = requests.get(f"https://api.transport.nsw.gov.au/v1/carpark?facility=1", 
        headers={
            "Accept": "application/json",
            "Authorization": "apikey 3GOROOAtKrINrIl9djXjiRZ0oXWzTweBMAst"
        }
    )
    data = json.loads(r.content)
    # return render_template('index.html', data=data)
    return {}

# @homepage_router.route('/', methods=['POST'])
# def index_post():
#     print(request.method)
#     print(request.form.get('search_location'))

#     query = request.form.get('search_location')

#     r = requests.get(f"https://api.transport.nsw.gov.au/v1/carpark?facility={query}", 
#         headers={
#             "Accept": "application/json",
#             "Authorization": "apikey 3GOROOAtKrINrIl9djXjiRZ0oXWzTweBMAst"
#         }
#     )
#     data = json.loads(r.content)

#     return render_template('index.html', data=data)

@homepage_router.route('/api/search/', methods=['POST'])
def show_results():
    query = request.get_json()
    print(query)

    r = requests.get(f"https://api.transport.nsw.gov.au/v1/carpark?facility={query}", 
        headers={
            "Accept": "application/json",
            "Authorization": "apikey 3GOROOAtKrINrIl9djXjiRZ0oXWzTweBMAst"
        }
    )
    data = json.loads(r.content)
    
    return data