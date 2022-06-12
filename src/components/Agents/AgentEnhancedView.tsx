import { Button, Modal, Input } from "antd";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IAgent, IReview } from "../../types/Agent";

import "./Agent.css";

const Agent: FC = () => {
  const fallbackPhotoUrl =
    "https://joeschmoe.io/api/v1/mail@ashallendesign.co.uk";

  const [agent, setAgent] = useState<IAgent>();
  const [showTextArea, setShowTextArea] = useState(false);
  const { agentId } = useParams();
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    const fetchAgent = async () => {
      const { data: agents } = await axios.get(`/agents/${agentId}`);
      setAgent(agents);
      const { data: reviews } = await axios.get(`/reviews/${agentId}`);
      setReviews(reviews);
    };
    fetchAgent();
  }, []);

  const handleOnClick = () => {
    setShowTextArea(true);
  };

  const closeAddReview = () => {
    setShowTextArea(false);
  };

  const handleOnChange = (ev: React.FormEvent<HTMLTextAreaElement>) => {
    setReview(ev.currentTarget.value);
  };

  const handleSubmitReview = async () => {
    if (review.length === 0) return;
    setLoading(true);
    const body = {
      review: review,
      agentId: agentId,
    };
    const { data, status } = await axios.post("/reviews", body);
    if (status === 200 && data) {
      reviews.push(data);
      setReviews([...reviews]);
    }
    setLoading(false);
    closeAddReview();
  };

  return (
    <div className="container enhanced">
      {agent ? (
        <>
          <header>
            <div className="avatar-holder">
              <img
                src={agent.photoUrl || fallbackPhotoUrl}
                className="avatar"
                alt={agent.firstName}
              />
            </div>
            <h2 className="agent-name">
              {agent.firstName + " " + agent.lastName}
            </h2>
          </header>
          <div className="body">{agent.aboutMe}</div>
          <div className="reviewTitle">Reviews</div>
          {reviews.length > 0 ? (
            <div className="reviews">
              {reviews.map(({ review, id }) => {
                return (
                  <div key={id} className="review">
                    {review}
                  </div>
                );
              })}
              <div key={"addNewReview"} className="review addReview">
                <Button type="primary" onClick={handleOnClick}>
                  Add Review
                </Button>
              </div>
            </div>
          ) : (
            <div className="reviews">
              <div key={"addNewReview"} className="review addReview">
                <Button type="primary" onClick={handleOnClick}>
                  Add Review
                </Button>
              </div>
            </div>
          )}

          <footer>
            <div className="full-width-flex-box">
              <div className="one-third-flex-box">
                <span>{agent.address}</span>
              </div>
              <div className="one-third-flex-box">
                <span>Areas of Practice: {agent.practiceAreas}</span>
              </div>
            </div>
          </footer>
        </>
      ) : (
        ""
      )}
      <Modal
        title="Add your review"
        visible={showTextArea}
        destroyOnClose={true}
        className="modalWrapper"
        maskClosable={false}
        footer={null}
        onCancel={closeAddReview}
      >
        <Input.TextArea
          className="addReviewSection"
          placeholder="Please type here"
          maxLength={250}
          onChange={handleOnChange}
        />
        <Button
          className="btnSubmitReview"
          type="primary"
          onClick={handleSubmitReview}
          loading={loading}
        >
          Submit Review
        </Button>
      </Modal>
    </div>
  );
};

export default Agent;
