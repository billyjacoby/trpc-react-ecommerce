import React from 'react';

import { Layout } from '@components/Layout';
import { trpc } from '../../utils/trpc';
import { Item } from './components/Item';
import type { Item as ItemType } from '@prisma/client';
import { Prisma } from '@prisma/client';
import styled from 'styled-components';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';

export const AdminPage = () => {
  const [name, setName] = React.useState('');
  const [number_in_stock, setnumberInStock] = React.useState<string>('0');
  const [cost, setCost] = React.useState<string>('0');

  const { data: items, refetch } = trpc.items.listItems.useQuery();
  const addItemMutation = trpc.items.addItem.useMutation();
  const deleteItemMutation = trpc.items.removeItem.useMutation();
  const updateItem = trpc.items.updateItem.useMutation();

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
              <label>name:</label>
              <Input
                type="text"
                name="item-name"
                value={name}
                onChange={(v) => setName(v.target.value)}
              />
            </div>
            <div className="text-center">
              <label>on hand:</label>
              <Input
                type="text"
                name="item-on-hand"
                value={number_in_stock}
                onChange={(v) => setnumberInStock(v.target.value)}
              />
            </div>
            <div className="text-center">
              <label>cost:</label>
              <Input
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
        <div className="flex flex-col gap-1">
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
        </div>
      </>
    </Layout>
  );
};
