import type { ButtonProps, PopconfirmProps } from 'antd';
import React from 'react';
import { Button, ConfigProvider, Popconfirm, Dropdown, App } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

export type TableActionMenu = {
  ifShow?: boolean;
  text: string | number;
  key: string | number;
  confirm?: Pick<PopconfirmProps, 'okText' | 'cancelText' | 'title' | 'description' | 'onConfirm'>;
} & Pick<ButtonProps, 'type' | 'danger' | 'disabled' | 'onClick'>;

export type TableActionDropdownItem = {
  ifShow?: boolean;
  text: string | number;
  key: string | number;
  disabled?: boolean;
  confirm?: PopconfirmProps;
  onClick?: () => void;
} & Pick<ButtonProps, 'onClick'>;

export type TableActionProps = {
  menus: TableActionMenu[];
  dropDowns?: TableActionDropdownItem[];
};

export const TableAction: React.FC<TableActionProps> = ({ menus, dropDowns }) => {
  const { modal } = App.useApp();
  function dropDownItemClick(info: { key: string }) {
    dropDowns?.forEach((d) => {
      if (d.key === info.key) {
        if (d.confirm) {
          modal.confirm({
            title: typeof d.confirm.title === 'function' ? d.confirm.title() : d.confirm.title,
            content:
              typeof d.confirm.description === 'function'
                ? d.confirm.description()
                : d.confirm.description,
            cancelText: d.confirm.cancelText,
            okText: d.confirm.okText,
            onOk: d.confirm.onConfirm,
          });
        } else if (d.onClick) {
          d.onClick();
        }
      }
    });
  }
  function renderDropDown(dropdowns: TableActionMenu[] | undefined) {
    if (dropdowns && dropdowns.length > 0) {
      return (
        <Dropdown
          menu={{
            onClick: dropDownItemClick,
            items: dropdowns.map((d) => {
              return {
                label: d.text,
                key: d.key,
                danger: d.danger,
              };
            }),
          }}
        >
          <a>
            <EllipsisOutlined />
          </a>
        </Dropdown>
      );
    } else {
      return <></>;
    }
  }
  function renderButton({ ifShow, ...menu }: TableActionMenu) {
    if (menu.confirm) {
      return (
        <Popconfirm {...menu.confirm} key={menu.key}>
          <Button size="small" type="link" {...menu} key={menu.key}>
            {menu.text}
          </Button>
        </Popconfirm>
      );
    } else {
      return (
        <Button
          size="small"
          type="link"
          {...menu}
          onClick={menu.confirm ? undefined : menu.onClick}
        >
          {menu.text}
        </Button>
      );
    }
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            paddingInline: 5,
            paddingInlineLG: 5,
            paddingInlineSM: 5,
          },
        },
      }}
    >
      {menus.filter((x) => typeof x.ifShow === 'undefined' || x.ifShow).map((m) => renderButton(m))}
      {renderDropDown(dropDowns)}
    </ConfigProvider>
  );
};
