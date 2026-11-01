import { QUESTIONS } from '~/constants/questions';
import { Accordion } from '~/ui/accordion/accordion';

const ITEMS = QUESTIONS.map(({ id, question, answer }) => ({
  id,
  title: question,
  content: answer,
}));

export interface QuestionsProps {
  className?: string;
}

export const Questions: React.FC<QuestionsProps> = ({ className }) => (
  <div id="questions" className={className}>
    <div className="text-center">
      <h3 className="type-hand-lg inline-block -rotate-2">
        Questions? Answers.
      </h3>
      <svg
        aria-hidden="true"
        viewBox="0 0 36 56"
        className="mx-auto mt-2 h-14 w-9 overflow-visible"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 3 C 6 18, 28 30, 18 50" />
        <path d="M18 50 L 9 42 M18 50 L 26 41" />
      </svg>
    </div>
    <Accordion items={ITEMS} headingLevel="h4" className="mt-6" />
  </div>
);
