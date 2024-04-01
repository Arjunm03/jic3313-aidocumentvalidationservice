import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
import "./App.css";
import { useContext, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

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
  const [type, setType] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState({});
  const [pdfFile, setPdfFile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");
  const API = "http://localhost:3001";

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
    setType("");
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

    const result = await axios.post(API + "/upload-files", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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
  const updateValidationResults = async (id, pdf, title) => {
    const pdfDir = `${API}/files/${pdf}`;
    const stat = "Accept";
    const description = "High";
    const result = await axios.put(
      `${API}/update-validation/${stat}/${description}/${id}`
    );
    console.log(result.data);
    alert(
      `${result.data.title} is being processed. \nDocument status: ${result.data.validationStatus}\nDocument description: ${result.data.validationDescription}`
    );
    getPdf();
  };

  // Delete a Document by ID
  const deleteDocument = async (id, title) => {
    const result = await axios.delete(`${API}/delete-doc-byid/${id}`);
    console.log(result.data);
    alert(`${title} Successfully Deleted!`);
    getPdf();
  };

  // Create a new Account
  const createAccount = async (e) => {
    e.preventDefault();
    const newUser = e.target.username.value;
    const newPass = e.target.password.value;
    const result = await axios.post(`${API}/create-user/${newUser}/${newPass}`);
    if (result.data.status === "ok") {
      alert(
        `New User Created!\nUsername: ` + newUser + `\nPassword: ` + newPass
      );
    } else {
      alert("Error: Username already exists.");
    }
    document.getElementById("create-username").value = "";
    document.getElementById("create-password").value = "";
  };

  // Get the Results for a PDF Validation (TODO)
  const overrideValidationResults = async (id, pdf, title, status) => {
    const pdfDir = `${API}/files/${pdf}`;
    if (status == "Accept") {
      const stat = "Reject";
      const description = "High";
      const result = await axios.put(
        `${API}/update-validation/${stat}/${description}/${id}`
      );
      console.log(result.data);
      alert(
        result.data.title +
          ` has been overriden to ` +
          result.data.validationStatus +
          `ed.`
      );
    } else if (status == "Reject") {
      const stat2 = "Accept";
      const description = "High";
      const result = await axios.put(
        `${API}/update-validation/${stat2}/${description}/${id}`
      );
      console.log(result.data);
      alert(
        result.data.title +
          ` has been overriden to ` +
          result.data.validationStatus +
          `ed.`
      );
    }
    getPdf();
  };

  function ResultsPage({ location, userType, data, API }) {
    // Check if location or location.state is undefined
    //if (!location || !location.state) {
    //return <div>No data passed.</div>;
    //}

    //const data = location.state.data;
    // Display the results here

    const [result, setResult] = useState(null);

    useEffect(() => {
      const getData = async () => {
        const val = await axios.get(`${API}/validation-data/${data._id}`);
        setResult(val);
      };
      getData();
    }, []);

    // console.log(result.data.validationStatus);
    // const result = await axios.get(
    //   `${API}/validation-data/${data._id}`
    // );
    return (
      <>
        <div>
          Results of Automatic Validation:{" "}
          {result ? result.data.validationStatus : "Processing..."}
        </div>
        {userType == "admin" && (
          <>
            <div>
              {" "}
              Confidence:{" "}
              {result
                ? result.data.validationDescription
                : "Processing..."}{" "}
            </div>
            <button
              className="btn btn-primary"
              onClick={() =>
                overrideValidationResults(
                  result.data._id,
                  result.data.pdf,
                  result.data.title,
                  result.data.validationStatus
                )
              }
            >
              Override result
            </button>{" "}
          </>
        )}
      </>
    );
  }

  if (loggedIn) {
    return (
      <div className="container">
        <Router>
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
              <label for="type">Choose a document type: </label>
              <select
                className="type"
                required
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Tax W-2">Tax W-2</option>
                <option value="Tax 1040">Tax 1040</option>
                <option value="Tax 1098">Tax 1098</option>
                <option value="Tax 1099">Tax 1099</option>
                <option value="SF-86">SF-86</option>
              </select>
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
                  : allImage.map((data, key) => {
                      return (
                        <>
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
                                  updateValidationResults(
                                    data._id,
                                    data.pdf,
                                    data.title
                                  )
                                }
                                disabled={userType == "user"}
                              >
                                Process Document
                              </button>{" "}
                              &nbsp; &nbsp; &nbsp; &nbsp; Validation Status:
                              &nbsp;
                              <span class="badge text-bg-info">
                                {data.validationStatus}
                              </span>
                              &nbsp; &nbsp; &nbsp; &nbsp;
                              <Link
                                to={{
                                  pathname: `/results_${key}`,
                                  state: { data: data },
                                }}
                                className="btn btn-secondary"
                              >
                                View Results
                              </Link>
                              &nbsp; &nbsp; &nbsp; &nbsp;
                              <button
                                className="btn btn-secondary"
                                onClick={() =>
                                  deleteDocument(data._id, data.title)
                                }
                              >
                                Delete Document
                              </button>
                            </h6>
                          </div>
                          <Routes>
                            <Route
                              path={`/results_${key}`}
                              element={
                                <ResultsPage
                                  userType={userType}
                                  data={data}
                                  API={API}
                                />
                              }
                            />
                          </Routes>
                        </>
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
        </Router>
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
              id="create-username"
              type="text"
              name="username"
              placeholder="New Username"
              required
            />{" "}
            &nbsp;
            <input
              id="create-password"
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
