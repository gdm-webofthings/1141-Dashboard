import { useState } from 'react';

import useData from '../../core/hooks/useData';
import { ChangeIpModal } from './ChangeIpModal';
import { LightController } from './LightController';

export const Light = () => {
  const {
    data: { lightIP },
  } = useData();
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="light-config">
        <button onClick={() => setShowModal(true)}>
          <i class="bi bi-gear-fill"></i>
        </button>
        {showModal && <ChangeIpModal closeModal={() => setShowModal(false)} />}
      </div>

      <LightController ip={lightIP} />
    </div>
  );
};
