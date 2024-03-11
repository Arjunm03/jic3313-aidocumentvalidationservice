import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
import "./App.css";
import { useContext, createContext } from "react";

//START FUNCTIONS FOR LOGIN
const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    //setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    //setTimeout(cb, 100); // fake async
  },
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (cb) => {
    return fakeAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

  const signout = (cb) => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}

//END FUNCTIONS FOR LOGIN

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState({});
  const [pdfFile, setPdfFile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");
  const API = "http://localhost:3001"

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const user = e.target.username.value;
    const password = e.target.password.value;
    const result = await axios.get(
      API + "/verify/" + user + "/pass/" + password
    );
    console.log(result.data);
    if (result.data.status) {
      setUserType(result.data.userType);
      setUsername(user);
      setLoggedIn(true);
      alert("Successfully Logged in as " + user + "!");
    } else {
      alert("Login Info Incorrect!");
    }
  };

  // Called when the user logs out
  const handleLogout = () => {
    setUsername("");
    setUserType("");
    setPdfFile(null);
    setAllImage({});
    setTitle("");
    setFile("");
    setLoggedIn(false);
  };

  useEffect(() => {
    getPdf();
  }, [username]);
  const getPdf = async () => {
    console.log("user type is " + userType); // This should print out the user type, but isnt working bc this function is async
    const result = await axios.get(
      `${API}/get-files-user/${username}/${userType}`
    );
    console.log(result.data.data);
    setAllImage(result.data.data);
    console.log(allImage);
  };

  // Upload PDF into the backend
  const submitImage = async (e) => {
    console.log("Attempting to Submit Image");
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("user", username);
    console.log(title, file);
    console.log(formData);

    const result = await axios.post(
      API + "/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status === "ok") {
      alert("Document Uploaded Successfully!");
      getPdf();
    }
  };

  // Display PDF
  const showPdf = (pdf) => {
    setPdfFile(`${API}/files/${pdf}`);
  };

  // Get the Results for a PDF Validation (TODO)
  const updateValidationResults = async (id, pdf) => {
    const pdfDir = `${API}/files/${pdf}`;
    const stat = "test";
    const description = "test";
    const result = await axios.put(
      `${API}/update-validation/${stat}/${description}/${id}`
    );
    console.log(result.data);
    alert(
      `Document Processed Successfully!\nDocument status: ${result.data.validationStatus}\nDocument description: ${result.data.validationDescription}`
    );
    getPdf();
  };

  // Create a new Account
  const createAccount = async (e) => {
    e.preventDefault();
    const newUser = e.target.username.value;
    const newPass = e.target.password.value;
    const result = await axios.post(
      `${API}/create-user/${newUser}/${newPass}`
    );
    if (result.data.status === "ok") {
      alert(`New User Created!\nUsername: ` + newUser + `\nPassword: ` + newPass);
    } else {
      alert("Error: Username already exists.");
    }
  };

  if (loggedIn) {
    return (
      <div class="App">
        <form className="formStyle" onSubmit={submitImage}>
          <h4>Upload PDF for Document Validation Service</h4>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Enter Title Here"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <input
            type="file"
            class="form-control"
            accept="application/pdf"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <button class="btn btn-primary" type="submit">
            Upload File
          </button>
        </form>
        <br></br>
        <div className="uploaded">
          <h4>Previously Uploaded PDFs:</h4>
          <div className="output-div">
            {Object.keys(allImage).length === 0
              ? ""
              : allImage.map((data) => {
                  return (
                    <div className="inner-div">
                      <h6>
                        {data.title} &nbsp; &nbsp; &nbsp; &nbsp;
                        <button
                          className="btn btn-primary"
                          onClick={() => showPdf(data.pdf)}
                        >
                          Open {data.title}
                        </button>{" "}
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <button
                          className="btn btn-secondary"
                          onClick={() =>
                            updateValidationResults(data._id, data.pdf)
                          }
                        >
                          Process Document
                        </button>{" "}
                        &nbsp; &nbsp; &nbsp; &nbsp; Validation Status: &nbsp;
                        <span class="badge text-bg-info">
                          {data.validationStatus}
                        </span>
                      </h6>
                    </div>
                  );
                })}
          </div>
          <br />
        </div>
        <br></br>
        <h4>PDF Viewer</h4>
        <PdfComp pdfFile={pdfFile} />
        <br></br>
        <button className="btn btn-danger" onClick={() => showPdf(null)}>
          Close PDF Viewer
        </button>
        <br></br>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  } else {
    return (
      <div class="App">
        <div class="center">
          <h4>Microsoft OpenAI Document Validation Service Login</h4> <br></br>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
            />{" "}
            &nbsp;
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />{" "}
            <br></br> <br></br>
            <button type="submit">Login</button>
          </form>
          <br></br> <br></br>
          No Account Yet? Use the Form Below to Create a New User Account
          <br></br>
          <form onSubmit={createAccount}>
            <input
              type="text"
              name="username"
              placeholder="New Username"
              required
            />{" "}
            &nbsp;
            <input
              type="password"
              name="password"
              placeholder="New Password"
              required
            />{" "}
            <br></br> <br></br>
            <button type="submit">Create Account</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
