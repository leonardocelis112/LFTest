import tornado.ioloop
import tornado.web
import json

class MainHandler(tornado.web.RequestHandler):
    def post(self):
        self.set_header('Content-Type', 'application/json')
        parsed_body = json.loads(self.request.body)
        if not (parsed_body['application'] and parsed_body['application']['requested_amount']):
            return self.send_error(400)

        requested_amount = parsed_body['application']['requested_amount']
        evaluation_result = self.__evaluate_loan(requested_amount)
        self.write(json.dumps({'message': evaluation_result}))

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
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()