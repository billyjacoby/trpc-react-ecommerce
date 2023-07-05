import React from 'react';
import type {Item as ItemType} from '@prisma/client';
import styled from 'styled-components';
import {Button} from '@components/ui/button';

export const Item = (props: {
  item: ItemType;
  onDeleteItem: (id: string) => void;
  onUpdateItem: (args: Partial<ItemType>) => void;
  isAuthed: boolean;
}) => {
  const {item, onDeleteItem, onUpdateItem, isAuthed} = props;

  const [isEditing, setIsEditing] = React.useState(false);
  const [onHand, setOnHand] = React.useState<number>(item.number_in_stock ?? 0);
  const [cost, setCost] = React.useState<number>(item.cost ?? 0);

  return (
    <Container>
      {isAuthed && (
        <Row>
          {isEditing ? (
            <>
              <EditButton onClick={() => setIsEditing(false)}>
                Cancel
              </EditButton>
              <EditButton onClick={() => onDeleteItem(item.id)}>
                Delete
              </EditButton>
            </>
          ) : null}

          <EditButton
            onClick={
              isEditing
                ? () => {
                    onUpdateItem({id: item.id, cost, number_in_stock: onHand});
                    setIsEditing(false);
                  }
                : () => setIsEditing(true)
            }>
            {isEditing ? 'Submit' : 'Edit'}
          </EditButton>
        </Row>
      )}

      <h4>{item.name}</h4>
      <Row>
        <label>On Hand:</label>
        {isEditing ? (
          <input
            type="number"
            className="rounded-md p-1 w-20 align-middle"
            value={onHand}
            onChange={e =>
              setOnHand(
                isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value),
              )
            }
          />
        ) : (
          <span className="p-2">{item.number_in_stock}</span>
        )}
      </Row>
      <Row>
        <label>Cost:</label>
        {isEditing ? (
          <input
            className="rounded-md p-1 w-20 align-middle"
            type="number"
            step={0.01}
            value={cost}
            onChange={e =>
              setCost(
                isNaN(parseFloat(e.target.value))
                  ? 0
                  : parseFloat(e.target.value),
              )
            }
          />
        ) : (
          <span>{item.cost}</span>
        )}
      </Row>
      <Row>
        <label>Photos Length:</label>
        <span>{item.photos.length}</span>
      </Row>
    </Container>
  );
};

const EditButton = styled(Button)`
  position: relative;
  top: -8px;
  right: -24px;
`;

const Container = styled.div`
  border: solid 1px white;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 16px 32px;
  border-radius: 4px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;
