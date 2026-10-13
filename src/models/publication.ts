interface PublicationBase {
  id: string;
  title: string;
  authorId: string;
}

export interface BDModel extends PublicationBase {
  kind: 'BD';
  color: boolean;
}

export interface RomanModel extends PublicationBase {
  kind: 'ROMAN';
  preface: boolean;
}

export type PublicationModel = BDModel | RomanModel;