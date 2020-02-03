import os
import tornado.ioloop
import tornado.web
import json

class MainHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def post(self):
        self.set_header('Content-Type', 'application/json')
        parsed_body = json.loads(self.request.body)
        if not (parsed_body['application'] and parsed_body['application']['requested_amount']):
            return self.send_error(400)

        requested_amount = parsed_body['application']['requested_amount']
        evaluation_result = self.__evaluate_loan(requested_amount)
        self.write(json.dumps({'message': evaluation_result}))

    def options(self):
        self.set_status(204)
        self.finish()

    def __evaluate_loan(self, requested_amount):
        if requested_amount > 50000:
            return 'Declined'
        elif requested_amount < 50000:
            return 'Approved'
        else:
            return 'Pending'

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(int(os.environ.get("PORT", 5000)))
    tornado.ioloop.IOLoop.current().start()