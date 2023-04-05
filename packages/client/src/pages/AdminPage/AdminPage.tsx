import React from 'react';

import { Layout } from '@components/Layout';
import { trpc } from '../../utils/trpc';
import { Button, Label, TextInput } from 'flowbite-react';
import { Item } from './components/Item';
import type { Item as ItemType } from '@prisma/client';
import { Prisma } from '@prisma/client';
import styled from 'styled-components';

export const AdminPage = () => {
  const [name, setName] = React.useState('');
  const [number_in_stock, setnumberInStock] = React.useState<string>('0');
  const [cost, setCost] = React.useState<string>('0');

  const { data: items, refetch } = trpc.listItems.useQuery();
  const addItemMutation = trpc.addItem.useMutation();
  const deleteItemMutation = trpc.removeItem.useMutation();
  const updateItem = trpc.updateItem.useMutation();

  const insertItem = (vars: {
    name: string;
    cost?: number;
    number_in_stock?: number;
  }) => {
    addItemMutation.mutate(vars);
  };

  React.useEffect(() => {
    if (addItemMutation.data) {
      refetch();
    }
    if (deleteItemMutation.data) {
      refetch();
    }
    if (updateItem.data) {
      refetch();
    }
  }, [addItemMutation, deleteItemMutation, updateItem]);

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onUpdateItem({
      name,
      cost: isNaN(parseInt(cost)) ? undefined : parseInt(cost),
      number_in_stock: isNaN(parseInt(number_in_stock))
        ? undefined
        : parseFloat(number_in_stock),
    });
    setName('');
    setCost('');
    setnumberInStock('');
  };

  const onUpdateItem = ({
    id,
    name,
    cost,
    number_in_stock,
  }: Partial<ItemType>) => {
    if (id) {
      // Update item
      console.log('updating');
      updateItem.mutate({
        id,
        cost,
        number_in_stock: number_in_stock ?? 0,
      });
    } else if (name) {
      // add new item
      insertItem({
        name,
        cost: isNaN(parseFloat(String(cost)))
          ? undefined
          : parseFloat(String(cost)),
        number_in_stock: isNaN(parseFloat(String(number_in_stock)))
          ? undefined
          : parseFloat(String(number_in_stock)),
      });
    }
  };

  const onDeleteItem = (id: string) => {
    deleteItemMutation.mutate({ id });
    refetch();
  };
  return (
    <Layout>
      <>
        <h1 className="m-2">Admin</h1>
        <form
          onSubmit={onSubmitForm}
          className="m-2 flex flex-col justify-center"
        >
          <div className="flex gap-4 flex-1">
            <div className="text-center">
              <Label>name:</Label>
              <TextInput
                type="text"
                name="item-name"
                value={name}
                onChange={(v) => setName(v.target.value)}
              />
            </div>
            <div className="text-center">
              <Label>on hand:</Label>
              <TextInput
                type="text"
                name="item-on-hand"
                value={number_in_stock}
                onChange={(v) => setnumberInStock(v.target.value)}
              />
            </div>
            <div className="text-center">
              <Label>cost:</Label>
              <TextInput
                type="number"
                name="item-cost"
                step="0.01"
                value={cost}
                onChange={(v) => setCost(v.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="my-2 flex-1 rounded">
            Insert Item
          </Button>
        </form>
        <ItemsContainer>
          {items ? <h3>Items: </h3> : null}
          {items &&
            items?.message &&
            items.message.map((item, index) => {
              return (
                <Item
                  item={item}
                  onDeleteItem={onDeleteItem}
                  onUpdateItem={onUpdateItem}
                />
              );
            })}
        </ItemsContainer>
      </>
    </Layout>
  );
};

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
