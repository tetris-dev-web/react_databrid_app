import * as React from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import {
  Form,
  Field,
  FormElement,
  FieldRenderProps,
} from "@progress/kendo-react-form";
import { Input, Switch } from "@progress/kendo-react-inputs";
import {DateInput } from "@progress/kendo-react-dateinputs";
import { Error } from "@progress/kendo-react-labels";

interface AddUserProps {
  cancelAdd: () => void;
  onSubmit: (event: any) => void;
}

const usernameValidator = (value: string) => {
  if (value == "") return "Username is required.";
  // if (value.length > 15) return "Username length should be less than 15.";
}

const nameValidator = (value: string) => {
  if (value == "") return "required.";
  // if (value.length > 15) return "length should be less than 15.";
}

const submitValidator = (value: string) => {
  // if (value.length > 40) return "Full name length should be less than 40";
};

const AddUserDialog = (props: AddUserProps) => {
  return (
    <Dialog title="Add User" onClose={props.cancelAdd}>
      <Form
        onSubmit={props.onSubmit}
        render={(formRenderProps) => (
          <FormElement style={{ maxWidth: 650 }}>
            <fieldset className={"k-form-fieldset"}>
              <div className="mb-3">
                <Field
                  name={"username"}
                  component={Input}
                  label={"User Name"}
                  validator={usernameValidator}
                />
              </div>
              <div className="mb-6">
                <Field
                  name={"firstname"}
                  component={Input}
                  label={"First Name"}
                  validator={nameValidator}
                />
              </div>
              <div className="mb-6">
                <Field
                  name={"lastname"}
                  component={Input}
                  label={"Last Name"}
                  validator={nameValidator}
                />
              </div>
              <div className="mb-6">
                <Field
                  name={"lastlogin"}
                  component={DateInput}
                  label={"Last Login"}
                />
              </div>
              <div className="mb-6">
                <Field
                  name={"enabled"}
                  component={Switch}
                  label={"Enabled"}
                />
              </div>
            </fieldset>
            <DialogActionsBar>
              <div className="k-form-buttons">
                <button
                  type={"submit"}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                  disabled={!formRenderProps.allowSubmit}
                >
                  Submit
                </button>
                <button
                  type={"submit"}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                  onClick={props.cancelAdd}
                >
                  Cancel
                </button>
              </div>
            </DialogActionsBar> 
          </FormElement>
        )}
      />
    </Dialog>
  );
};
export default AddUserDialog;