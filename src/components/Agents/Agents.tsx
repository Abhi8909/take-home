import type { FC } from "react";
import { useState, useEffect } from "react";
import Agent from "./Agent";
import { IAgent } from "../../types/Agent";
import { Modal, Button, Input } from "antd";

import axios from "axios";
import "./Agents.css";
import Form from "../Form/Form";

const Agents: FC = () => {
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [orginalAgents, setOrginalAgents] = useState<IAgent[]>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);

  useEffect(() => {
    async function fetchInitialData() {
      const { data } = await axios.get("/agents");
      setAgents(data);
      setOrginalAgents(data);
    }
    fetchInitialData();
  }, []);

  const handleModalVisibility = () => {
    setOpenForm(!openForm);
  };

  const handleCreate = async (values: IAgent) => {
    const { data, status } = await axios.post("/agents", { ...values });
    if (status === 200 && data) {
      agents.push(data);
      setAgents([...agents]);
      setOrginalAgents([...agents]);
      handleModalVisibility();
    } else {
      alert("Could not add the agent. Something went wrong");
    }
  };

  const handleOnChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const searchQuery = ev.currentTarget.value;
    const filteredAgents = orginalAgents.filter((oAgent) =>
      oAgent.practiceAreas?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAgents(filteredAgents);
  };

  return (
    <>
      <div className="header">
        <Input
          placeholder="Search Agent by Practice Areas"
          className="inputSearch"
          onChange={handleOnChange}
        />
        <Button type="primary" size="large" onClick={handleModalVisibility}>
          Join the team!
        </Button>
      </div>
      <div className="agents">
        {agents.map((agent) => (
          <Agent key={agent.id} agent={agent} />
        ))}
      </div>

      <Modal
        title="Join the team!"
        visible={openForm}
        destroyOnClose={true}
        className="modalWrapper"
        maskClosable={false}
        footer={null}
        onCancel={handleModalVisibility}
      >
        <Form handleCreate={handleCreate} />
      </Modal>
    </>
  );
};

export default Agents;
