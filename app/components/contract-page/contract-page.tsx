import { Container } from '~/ui/container/container';
import {
  CancelContractForm,
  WithdrawContractForm,
} from '../contract-form/contract-form';

const ContractPage: React.FC<{
  title: string;
  lead: string;
  children: React.ReactNode;
}> = ({ title, lead, children }) => (
  <Container className="pt-14 sm:pt-20">
    <header className="mb-12 text-center sm:mb-16">
      <h1 className="type-hero text-balance">{title}</h1>
      <p className="type-lead mx-auto mt-6 max-w-[32ch] sm:mt-8 lg:max-w-none">
        {lead}
      </p>
    </header>
    <div className="mx-auto max-w-[640px] rounded-[2rem] bg-pca-grey-100 p-6 sm:p-10">
      {children}
    </div>
  </Container>
);

/** Cancelling Pro without signing in, behind the footer's link. */
export const CancelContract: React.FC = () => (
  <ContractPage
    title="Cancel contract."
    lead="Cancel pencil case Pro here, no sign-in needed."
  >
    <CancelContractForm />
  </ContractPage>
);

/** Withdrawing from Pro without signing in, behind the footer's link. */
export const WithdrawContract: React.FC = () => (
  <ContractPage
    title="Withdraw contract."
    lead="Changed your mind about pencil case Pro? Withdraw here, no reason needed."
  >
    <WithdrawContractForm />
  </ContractPage>
);
