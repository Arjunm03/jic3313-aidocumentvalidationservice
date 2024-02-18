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

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = e.target.username.value;
    const password = e.target.password.value;
    const result = await axios.get(
      "http://localhost:3001/verify/" + user + "/pass/" + password
    );
    console.log(result.data);
    if (result.data.status) {
      setUserType(result.data.userType);
      setUsername(user);
      setLoggedIn(true);
    } else {
      alert("Login info incorrect!");
    }
  };

  const handleLogout = () => {
    // setUsername("");
    // setUserType("");
    // setPdfFile(null);
    // setAllImage({});
    // setTitle("");
    // setFile("");
    setLoggedIn(false);
  };

  useEffect(() => {
    getPdf();
  }, [username]);
  const getPdf = async () => {
    console.log("user type is " + userType); // This should print out the user type, but isnt working bc this function is async
    const result = await axios.get(
      `http://localhost:3001/get-files-user/${username}`
    );
    console.log(result.data.data);
    setAllImage(result.data.data);
    console.log(allImage);
  };

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
      "http://localhost:3001/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status == "ok") {
      alert("Document Uploaded Successfully!");
      getPdf();
    }
  };
  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:3001/files/${pdf}`);
  };

  if (loggedIn) {
    return (
      <div className="App">
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
                        Title: {data.title} &nbsp; &nbsp;
                        <button
                          className="btn btn-primary"
                          onClick={() => showPdf(data.pdf)}
                        >
                          Open {data.title}
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() =>
                            alert(
                              "Document being processed! Results will be updated soon!"
                            )
                          }
                        >
                          Process Document
                        </button>
                      </h6>
                    </div>
                  );
                })}
          </div>
          <br />
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <PdfComp pdfFile={pdfFile} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <form onSubmit={handleLogin}>
          <input type="text" name="username" placeholder="Username" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        )
      </div>
    );
  }
}

export default App;
