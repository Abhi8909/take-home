export interface IAgent {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  agentLicence: string;
  address: string;
  practiceAreas: string;
  aboutMe: string;
}

export interface IAgentForm {
  handleCreate: (values: IAgent) => void;
}

export interface IReview {
  agentId: number,
  review: string,
  id: string
}

