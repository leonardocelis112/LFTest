import React from "react";
import { Formik, Form, Field, getIn } from "formik";
import Swal from "sweetalert2";
import "./ApplicationForm.css";

const SERVICE_URL = "https://lf-py-api.herokuapp.com/";

const initialState = {
  business: {
    tax_id: "",
    name: "",
    address: "",
    city: "",
    state: "",
    postal_code: ""
  },
  owner: {
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    social_security_number: "",
    postal_code: ""
  },
  requested_amount: ""
};

export default class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  validatePresence(value) {
    if (!value) {
      return "*Required";
    }
  }

  validateEmail(value) {
    if (!value) {
      return "*Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return "*Not a valid email";
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="card Form__card">
          <div className="card-body">
            <div className="row">
              <Formik
                initialValues={this.state}
                onSubmit={async values => {
                  const application = { application: values };
                  const response = await fetch(SERVICE_URL, {
                    method: "POST",
                    body: JSON.stringify(application),
                    mode: "cors"
                  });
                  const data = await response.json();
                  Swal.fire(data.message);
                }}
              >
                {({ errors, touched }) => {
                  return (
                    <Form className="col-sm-12 col-md-12">
                      <p className="lead">Business Information</p>
                      <div className="row">
                        <div className="form-group col-sm-12 col-md-6">
                          <label htmlFor="business_tax_id">Tax ID</label>
                          <Field
                            id="business_tax_id"
                            name="business.tax_id"
                            type="text"
                            className="form-control"
                            validate={this.validatePresence}
                          />
                          {getIn(errors, "business.tax_id") &&
                            getIn(touched, "business.tax_id") && (
                              <div className="text-danger">
                                {getIn(errors, "business.tax_id")}
                              </div>
                            )}
                        </div>
                        <div className="form-group col-sm-12 col-md-6">
                          <label htmlFor="business_name">Business Name</label>
                          <Field
                            id="business_name"
                            name="business.name"
                            type="text"
                            className="form-control"
                            validate={this.validatePresence}
                          />
                          {getIn(errors, "business.name") &&
                            getIn(touched, "business.name") && (
                              <div className="text-danger">
                                {getIn(errors, "business.name")}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-sm-12 col-md-6">
                          <label htmlFor="business_address">
                            Business Address
                          </label>
                          <Field
                            id="business_address"
                            name="business.address"
                            type="text"
                            className="form-control"
                            validate={this.validatePresence}
                          />
                          {getIn(errors, "business.address") &&
                            getIn(touched, "business.address") && (
                              <div className="text-danger">
                                {getIn(errors, "business.address")}
                              </div>
                            )}
                        </div>
                        <div className="form-group col-sm-12 col-md-6">
                          <label htmlFor="business_city">City</label>
                          <Field
                            id="business_city"
                            name="business.city"
                            type="text"
                            className="form-control"
                            validate={this.validatePresence}
                          />
                          {getIn(errors, "business.city") &&
                            getIn(touched, "business.city") && (
                              <div className="text-danger">
                                {getIn(errors, "business.city")}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-sm-12 col-md-6">
                          <label htmlFor="business_state">State</label>
                          <Field
                            id="business_state"
                            name="business.state"
                            type="text"
                            className="form-control"
                            validate={this.validatePresence}
                          />
                          {getIn(errors, "business.state") &&
                            getIn(touched, "business.state") && (
                              <div className="text-danger">
                                {getIn(errors, "business.state")}
                              </div>
                            )}
                        </div>
                        <div className="form-group col-sm-12 col-md-6">
                          <label htmlFor="business_postal_code">
                            Postal Code
                          </label>
                          <Field
                            id="business_postal_code"
                            name="business.postal_code"
                            type="text"
                            className="form-control"
                            validate={this.validatePresence}
                          />
                          {getIn(errors, "business.postal_code") &&
                            getIn(touched, "business.postal_code") && (
                              <div className="text-danger">
                                {getIn(errors, "business.postal_code")}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-sm-12 col-md-12">
                          <label htmlFor="requested_amount">
                            Requested Amount
                          </label>
                          <Field
                            id="requested_amount"
                            name="requested_amount"
                            type="number"
                            className="form-control"
                            validate={this.validatePresence}
                          />
                          {errors.requested_amount &&
                            touched.requested_amount && (
                              <div className="text-danger">
                                {errors.requested_amount}
                              </div>
                            )}
                        </div>
                      </div>
                      <br />
                      <p className="lead">Owner Information</p>
                      <div className="row">
                        <div className="form-group col-sm-12 col-md-6">
                          <label htmlFor="owner_social_security_number">
                            Social Security Number
                          </label>
                          <Field
                            id="owner_social_security_number"
                            name="owner.social_security_number"
                            type="text"
                            className="form-control"
                            validate={this.validatePresence}
                          />
                          {getIn(errors, "owner.social_security_number") &&
                            getIn(touched, "owner.social_security_number") && (
                              <div className="text-danger">
                                {getIn(errors, "owner.social_security_number")}
                              </div>
                            )}
                        </div>
                        <div className="form-group col-sm-12 col-md-6">
                          <label htmlFor="owner_name">Name</label>
                          <Field
                            id="owner_name"
                            name="owner.name"
                            type="text"
                            className="form-control"
                            validate={this.validatePresence}
                          />
                          {getIn(errors, "owner.name") &&
                            getIn(touched, "owner.name") && (
                              <div className="text-danger">
                                {getIn(errors, "owner.name")}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-sm-12 col-md-6">
                          <label htmlFor="owner_email">Email</label>
                          <Field
                            id="owner_email"
                            name="owner.email"
                            type="text"
                            className="form-control"
                            validate={this.validateEmail}
                          />
                          {getIn(errors, "owner.email") &&
                            getIn(touched, "owner.email") && (
                              <div className="text-danger">
                                {getIn(errors, "owner.email")}
                              </div>
                            )}
                        </div>
                        <div className="form-group col-sm-12 col-md-6">
                          <label htmlFor="owner_address">Address</label>
                          <Field
                            id="owner_address"
                            name="owner.address"
                            type="text"
                            className="form-control"
                            validate={this.validatePresence}
                          />
                          {getIn(errors, "owner.address") &&
                            getIn(touched, "owner.address") && (
                              <div className="text-danger">
                                {getIn(errors, "owner.address")}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-sm-12 col-md-6">
                          <label htmlFor="owner_city">City</label>
                          <Field
                            id="owner_city"
                            name="owner.city"
                            type="text"
                            className="form-control"
                            validate={this.validatePresence}
                          />
                          {getIn(errors, "owner.city") &&
                            getIn(touched, "owner.city") && (
                              <div className="text-danger">
                                {getIn(errors, "owner.city")}
                              </div>
                            )}
                        </div>
                        <div className="form-group col-sm-12 col-md-6">
                          <label htmlFor="owner_state">State</label>
                          <Field
                            id="owner_state"
                            name="owner.state"
                            type="text"
                            className="form-control"
                            validate={this.validatePresence}
                          />
                          {getIn(errors, "owner.state") &&
                            getIn(touched, "owner.state") && (
                              <div className="text-danger">
                                {getIn(errors, "owner.state")}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-sm-12 col-md-6">
                          <label htmlFor="owner_postal_code">Postal Code</label>
                          <Field
                            id="owner_postal_code"
                            name="owner.postal_code"
                            type="text"
                            className="form-control"
                            validate={this.validatePresence}
                          />
                          {getIn(errors, "owner.postal_code") &&
                            getIn(touched, "owner.postal_code") && (
                              <div className="text-danger">
                                {getIn(errors, "owner.postal_code")}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="row float-right">
                        <button className="btn btn-primary" type="submit">
                          Request a Loan
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
