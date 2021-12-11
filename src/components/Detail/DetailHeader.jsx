import { useState } from "react";
import useElectron from "../../core/hooks/useElectron";
import { CreationForm } from "../Forms/CreationForm";
import { DefaultClientForm } from "../Forms/DefaultClientForm";
import { Confirmation } from "../Modal/Content/Confirmation";
import { OnState } from "../Modal/Content/OnState";
import { Modal } from "../Modal/Modal";

// Delete "Client-" from data.id
const formatData = (data) => {
  return {
    ...data,
    id: data.id.split("-").pop(),
  };
};

export const DetailHeader = ({ data, noHeader }) => {
  const { ipcRenderer } = useElectron();

  const [stateVisible, setStateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [defaultHidden, setDefaultHidden] = useState(true);

  const toggleEditVisible = () => {
    setEditVisible(!editVisible);
  };

  const toggleStateVisible = () => {
    setStateVisible(!stateVisible);
  };

  const toggleDeleteVisible = () => {
    setDeleteVisible(!deleteVisible);
  };

  const handleDelete = () => {
    ipcRenderer.send("deleteClient", data.id);
    toggleDeleteVisible();
  };

  const handleEdit = (editedData) => {
    ipcRenderer.send("saveClient", editedData);
    toggleEditVisible();
  };

  const toggleModal = () => {
    setDefaultHidden(!defaultHidden);
  };

  if (noHeader) {
    return (
      <>
        <div className="detail__header">
          <h1>{`${data.id} | ${data.puzzleName}`}</h1>
          <div>
            <button onClick={toggleModal}>
              <i className="bi bi-gear-fill"></i>
            </button>
          </div>
        </div>

        {!defaultHidden && (
          <Modal onClose={toggleModal}>
            <div className="creation">
              <DefaultClientForm closeModal={toggleModal} />
            </div>
          </Modal>
        )}
      </>
    );
  }

  return (
    <>
      <div className="detail__header">
        <h1>{`${data.id} | ${data.puzzleName}`}</h1>
        <div>
          <button onClick={toggleStateVisible}>
            <i className="bi bi-check-all"></i>
          </button>
          <button className="ml" onClick={toggleEditVisible}>
            <i className="bi bi-pencil-square"></i>
          </button>
          <button className="redbg ml" onClick={toggleDeleteVisible}>
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>

      {editVisible && (
        <Modal onClose={toggleEditVisible}>
          <div className="creation">
            <CreationForm
              title={`Edit ${data.id}`}
              initialData={formatData(data)}
              onSubmit={handleEdit}
              edit
            />
          </div>
        </Modal>
      )}

      {stateVisible && (
        <Modal onClose={toggleStateVisible}>
          <OnState closeModal={toggleStateVisible} />
        </Modal>
      )}

      {deleteVisible && (
        <Modal onClose={toggleDeleteVisible}>
          <Confirmation
            onClick={handleDelete}
            text={`Are you sure you want to delete ${data.id}?`}
          />
        </Modal>
      )}
    </>
  );
};
