import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import { firebaseTeams, firebaseArticles, firebase } from "../../firebase";

import RenderField from "../Widgets/RenderField/renderField";
import Uploader from "../Widgets/FileUploader/fileUploader";

import "./draft.css";
import "./dashboard.css";

class Dashboard extends React.Component {
  state = {
    editState: EditorState.createEmpty(),
    loading: false,
    registerError: "",
    formData: {
      author: {
        element: "input",
        label: "Name",
        value: "",
        config: {
          type: "text",
          name: "author",
          placeholder: "Enter your Name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMsg: ""
      },
      title: {
        element: "input",
        label: "Title",
        value: "",
        config: {
          type: "text",
          name: "title",
          placeholder: "Enter the Title"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMsg: ""
      },
      body: {
        element: "texteditor",
        value: "",
        valid: false
      },
      image: {
        element: "image",
        value: "",
        valid: false
      },
      team: {
        element: "select",
        value: "",
        config: {
          name: "teams",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMsg: ""
      }
    }
  };

  componentDidMount() {
    firebaseTeams.once("value").then(snapshot => {
      let teams = [];
      snapshot.forEach(childSnapshot => {
        teams.push({
          id: childSnapshot.val().teamId,
          name: childSnapshot.val().city
        });
      });
      let newFormData = { ...this.state.formData };
      let newElement = { ...newFormData["team"] };

      newElement.config.options = teams;
      this.setState({
        formData: newFormData
      });
    });
  }

  handleChange = newState => {
    this.setState({
      formData: newState
    });
  };

  onEditorStateChange = editState => {
    let content = editState.getCurrentContent();
    let html = stateToHTML(content);

    let textValue = JSON.parse(JSON.stringify(this.state.formData));
    textValue.body = JSON.parse(JSON.stringify(this.state.formData.body));
    textValue.body.value = html;
    textValue.body.valid = true;
    this.setState({
      editState,
      formData: textValue
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
    }

    for (let key in this.state.formData) {
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      this.setState({
        loading: true,
        registerError: ""
      });

      firebaseArticles
        .orderByChild("id")
        .limitToLast(1)
        .once("value")
        .then(snapshot => {
          let articleId = null;
          snapshot.forEach(childSnapshot => {
            articleId = childSnapshot.val().id;
          });
          dataToSubmit["date"] = firebase.database.ServerValue.TIMESTAMP;
          dataToSubmit["id"] = articleId + 1;
          dataToSubmit["team"] = parseInt(dataToSubmit["team"]);

          firebaseArticles
            .push(dataToSubmit)
            .then(article => {
              this.props.history.push(`articles/${article.key}`);
            })
            .catch(e => {
              this.setState({
                registerError: e.message
              });
            });
        });
    } else {
      this.setState({
        registerError: "something went wrong"
      });
    }
  };

  onStoreImage = filename => {
    let imageFile = JSON.parse(JSON.stringify(this.state.formData));
    imageFile.image = JSON.parse(JSON.stringify(this.state.formData.image));
    imageFile.image.value = filename;
    imageFile.image.valid = true;

    this.setState({
      formData: imageFile
    });
  };

  render() {
    return (
      <div className="dashboard_container">
        <h3>Add a Page</h3>
        <form onSubmit={event => this.submitForm(event)}>
          <Uploader imagename={filename => this.onStoreImage(filename)} />
          <RenderField
            data={this.state.formData}
            onblur={newState => this.handleChange(newState)}
            change={newState => this.handleChange(newState)}
          />
          <Editor
            editState={this.state.editState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
          />
          <button type="submit">Add Post</button>
        </form>
      </div>
    );
  }
}

export default Dashboard;
