import classNames from 'classnames';
import { useState } from 'react';
import { FIELD, SendableForm } from '../sendable-form/sendable-form';

const RADIO = 'size-5 accent-pca-grey-900';

/**
 * What both laws allow us to ask for: who the customer is, which contract
 * it is (the account's address) and where the confirmation goes (the same
 * address).
 */
const CustomerFields: React.FC<{ id: string }> = ({ id }) => (
  <>
    <label htmlFor={`${id}-name`} className="type-label block">
      Your name
    </label>
    <input
      id={`${id}-name`}
      name="name"
      type="text"
      autoComplete="name"
      maxLength={200}
      required
      className={classNames(FIELD, 'h-14')}
    />
    <label htmlFor={`${id}-email`} className="type-label mt-7 block">
      E-mail address of your account
    </label>
    <input
      id={`${id}-email`}
      name="email"
      type="email"
      autoComplete="email"
      spellCheck={false}
      required
      aria-describedby={`${id}-email-hint`}
      className={classNames(FIELD, 'h-14')}
    />
    <p id={`${id}-email-hint`} className="type-caption mt-2 text-pca-grey-700">
      It tells us which contract is yours, and we send the confirmation
      there.
    </p>
  </>
);

/**
 * The confirmation page § 312k BGB asks for behind “cancel contracts
 * here”: the kind of cancellation (with a reason for good cause), who,
 * which contract, when it should end, and a “Cancel now” button.
 */
export const CancelContractForm: React.FC = () => {
  const [isExtraordinary, setIsExtraordinary] = useState(false);

  return (
    <SendableForm
      form="cancellation"
      submitLabel="Cancel now"
      sentTitle="Your cancellation is on its way."
      sentText="We’ve e-mailed you a confirmation."
      failedSubject="Your cancellation"
      privacyNote={'We use these details only to carry out your '
        + 'cancellation and confirm it to you.'}
    >
      <CustomerFields id="cancel" />
      <fieldset className="mt-7">
        <legend className="type-label">Type of cancellation</legend>
        <label className="type-body mt-3 flex items-center gap-3">
          <input
            type="radio"
            name="cancellationType"
            value="ordinary"
            defaultChecked
            onChange={() => setIsExtraordinary(false)}
            className={RADIO}
          />
          Ordinary, with notice
        </label>
        <label className="type-body mt-2 flex items-center gap-3">
          <input
            type="radio"
            name="cancellationType"
            value="extraordinary"
            onChange={() => setIsExtraordinary(true)}
            className={RADIO}
          />
          Extraordinary, for good cause
        </label>
      </fieldset>
      {isExtraordinary && (
        <>
          <label htmlFor="cancel-reason" className="type-label mt-7 block">
            Reason for the extraordinary cancellation
          </label>
          <textarea
            id="cancel-reason"
            name="reason"
            rows={4}
            maxLength={5000}
            className={classNames(FIELD, 'min-h-32 resize-y py-4')}
          />
        </>
      )}
      <label htmlFor="cancel-ends-on" className="type-label mt-7 block">
        End the contract on
      </label>
      <input
        id="cancel-ends-on"
        name="endsOn"
        type="date"
        aria-describedby="cancel-ends-on-hint"
        className={classNames(FIELD, 'h-14')}
      />
      <p id="cancel-ends-on-hint" className="type-caption mt-2 text-pca-grey-700">
        Leave it empty to cancel at the earliest possible date.
      </p>
    </SendableForm>
  );
};

/**
 * The withdrawal function § 356a BGB asks for behind “withdraw from
 * contract here”: who and which contract, no reason, and a “Confirm
 * withdrawal” button.
 */
export const WithdrawContractForm: React.FC = () => (
  <SendableForm
    form="withdrawal"
    submitLabel="Confirm withdrawal"
    sentTitle="Your withdrawal is on its way."
    sentText="We’ve e-mailed you a confirmation."
    failedSubject="Your withdrawal"
    privacyNote={'We use these details only to carry out your withdrawal '
      + 'and confirm it to you.'}
  >
    <CustomerFields id="withdraw" />
  </SendableForm>
);
