import React, { useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { postUserFeedback } from "services/feedbackData";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { Stack, Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(true); // State for Collapse
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: "50% !important",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const handleFeedbackChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFeedback(event.target.value);
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  /* fetch user details from reducer*/
  const userId = useSelector(
    (state: any) => state.UserHealthDetailsReducer?.userHealthDetails?._id
  );
  const userFirstName = useSelector(
    (state: any) =>
      state.UserHealthDetailsReducer?.userHealthDetails?.Personal_Details
        ?.First_Name
  );
  const userLastName = useSelector(
    (state: any) =>
      state.UserHealthDetailsReducer?.userHealthDetails?.Personal_Details
        ?.Last_Name
  );
  const userName = userFirstName + " " + userLastName;

  const handleModalOpen = () => {
    setIsSuccessModalOpen(true);
  };

  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  /* Submit feedback component*/
  const handleSubmit = async () => {
    try {
      await postUserFeedback({
        rating,
        description: feedback,
        dateTime: new Date().toISOString(),
        profileName: userName,
        userId: userId,
      });

      setFeedback("");
      setRating(0);
      setAlertMessage("Feedback submitted successfully!");
      setAlertType("success");
      // handleModalOpen();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setAlertMessage("Error submitting feedback. Please try again.");
      setAlertType("error");
    }
  };

  return (
    <Box height={600} bgcolor={"#581845"}>
      <Box
        sx={{
          position: "absolute",
          top: "420%",
          left: "50%",
          zIndex: 1300,
          width: 300,
          transform: "translate(-50%, -20%)",
        }}
      >
        <Collapse in={open}>
          {alertMessage && (
            <Alert
              severity={alertType}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {alertMessage}
            </Alert>
          )}
        </Collapse>
      </Box>

      <Stack display={"flex"} direction={"row"} paddingTop={20}>
        <div>
          <Typography
            variant="h3"
            mb={2}
            textAlign="left"
            color={"white"}
            ml={5}
            mt={5}
          >
            Your Feedback is a secret to our awesomeness!
          </Typography>
        </div>
        <div>
          <Card
            sx={{
              margin: "auto",
              mt: 4,
              color: "#fff",
              ml: 5,
              mr: 5,
              width: 600,
            }}
          >
            {/* Alert message */}
            <CardContent>
              <form>
                <TextField
                  label="Your Feedback"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={feedback}
                  onChange={handleFeedbackChange}
                  margin="normal"
                  sx={{
                    backgroundColor: "#fff",
                    color: "green",
                    "&:hover": {
                      borderColor: "green",
                    },
                    "&:focus": {
                      borderColor: "green",
                      color: "green",
                    },
                  }}
                />

                <Box mt={2}>
                  <Typography component="legend" mb={1} color={"#581845"}>
                    Rate Your Experience
                  </Typography>
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={(
                      event: ChangeEvent<object>,
                      newValue: number | null
                    ) => handleRatingChange(newValue || 0)}
                    sx={{ color: "#581845" }}
                  />
                </Box>

                <Box mt={3}>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    // sx={{ backgroundColor: "#4CAF50" }}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
              <Modal
                open={isSuccessModalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    ...modalStyle,
                    backgroundColor: "green",
                    color: "white",
                    marginTop: 12,
                  }}
                ></Box>
              </Modal>
            </CardContent>
          </Card>
        </div>
      </Stack>
    </Box>
  );
};

export default Feedback;
