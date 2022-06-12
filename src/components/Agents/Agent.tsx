import type { FC } from "react";
import { IAgent } from "../../types/Agent";
import { useNavigate } from "react-router-dom";
import "./Agent.css";

const Agent: FC<{ agent: IAgent }> = ({ agent }) => {
  const fallbackPhotoUrl =
    "https://joeschmoe.io/api/v1/mail@ashallendesign.co.uk";
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/agent/${agent.id}`);
  };

  return (
    <div className="container" onClick={handleOnClick}>
      <header>
        <div className="avatar-holder">
          <img
            src={agent.photoUrl || fallbackPhotoUrl}
            className="avatar"
            alt={agent.firstName}
          />
        </div>
        <h2 className="agent-name">{agent.firstName + " " + agent.lastName}</h2>
      </header>
      <div className="body">{agent.aboutMe}</div>
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
    </div>
  );
};

export default Agent;
