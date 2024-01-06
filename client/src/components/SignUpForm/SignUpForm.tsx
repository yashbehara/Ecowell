import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Paper, Typography } from "@mui/material";
import { FORM_DATA_MODEL } from "constants/constants";
import {
  dispatchPostUserDetails,
  dispatchUpdateUserDetails,
} from "store/actionCreators/LandingPageActionCreators";
import { transformToFormDataModel } from "utils/utils";
import BackgroundImg from "assets/update_form.png";

interface SignUpFormProps {
  origin: "signup" | "update";
}

interface FormDataModel {
  Age: string;
  Height: string;
  Weight: string;
  BP_Upper_Limit: string;
  BP_Lower_Limit: string;
  Sugar_Upper_Limit: string;
  Sugar_Lower_Limit: string;
  Skeletal_Mass: string;
  Fat_Mass: string;
  Water_Mass: string;
  Intended_Sugar_Limit: string;
  Intended_Fat_Limit: string;
  Intended_Protein_Limit: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ origin }) => {
  const [formData, setFormData] = useState<FormDataModel>({
    ...FORM_DATA_MODEL,
  });
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userHealthDetails = useSelector(
    (state: any) => state?.UserHealthDetailsReducer?.userHealthDetails
  );

  //route based form update and signup component
  useEffect(() => {
    if (origin !== "signup" && userHealthDetails) {
      setFormData({ ...transformToFormDataModel({ ...userHealthDetails }) });
    }
  }, [origin, userHealthDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: false }));
  };

  const handleClick = () => {
    const newErrors: { [key: string]: string } = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = "Required";
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      //route origin based redirection from redux and saga
      if (origin === "signup") {
        dispatch(dispatchPostUserDetails({ userDetails: formData, navigate }));
      } else {
        dispatch(
          dispatchUpdateUserDetails({ userDetails: formData, navigate })
        );
      }
      setFormData({ ...FORM_DATA_MODEL });
    }
  };
  //sign/update form component
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${BackgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(8px) brightness(0.5)",
          minHeight: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          marginTop: "5rem",
          position: "relative",
          zIndex: 2,
          backgroundColor: "#ffffff",
        }}
      >
        <Paper style={{ padding: "20px", marginTop: "20px" }}>
          <Typography component="h1" variant="h5">
            {origin === "signup"
              ? "Sign Up for EcoFlow"
              : "Update your profile"}
          </Typography>
          <div>
            {Object.keys(formData).map((key) => (
              <TextField
                key={key}
                margin="normal"
                required
                fullWidth
                label={key.split("_").join(" ")}
                name={key}
                value={formData[key as keyof FormDataModel] as string} // Explicit type assertion
                onChange={handleChange}
                error={!!errors[key]}
                helperText={errors[key]}
                type={
                  key.includes("Limit") || key === "Age" ? "number" : "text"
                }
              />
            ))}
            <Button
              onClick={handleClick}
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: "20px 0" }}
            >
              {origin === "signup" ? "Sign-Up" : "Update profile"}
            </Button>
          </div>
        </Paper>
      </Container>
    </>
  );
};

export default SignUpForm;
