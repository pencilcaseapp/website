import { PLANS } from '~/constants/plans';
import { Container } from '~/ui/container/container';
import { Questions } from '../questions/questions';
import { PlanCard } from './plan-card';

export const Pricing: React.FC = () => (
  <section id="pricing" className="pt-36 sm:pt-48">
    <Container>
      <div className="text-center">
        <h2 className="type-section">Pricing</h2>
        <p className="type-lead mt-4 text-balance">
          One price, and a free plan for life.
        </p>
      </div>
      <div className="mx-auto mt-14 grid max-w-[880px] gap-6 md:grid-cols-2">
        {PLANS.map(plan => <PlanCard key={plan.id} plan={plan} />)}
      </div>
      <Questions className="mx-auto mt-14 max-w-[760px]" />
    </Container>
  </section>
);
