import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  useDisclosure,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { TrimTable, Column, Trim } from "../../lib/Types";

const TowingTable: React.FC<TrimTable> = ({ Trims }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const columns: Column[] = [];
  Object.getOwnPropertyNames(Trims[0]).forEach((key) => {
    if (key != "_id") {
      columns.push({
        key: key,
        label: key,
      });
    }
  });
  const renderCell = (user: Trim, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Trim];

    switch (columnKey) {
      case "Engine":
        return (
          <Chip color="success" variant="flat" className="text-bold text-small">
            {cellValue}
          </Chip>
        );
      case "Notes":
        return (
          <>
            <Button onClick={onOpen}>Open Modal</Button>
          </>
        );
      default:
        return (
          <div className="flex flex-col">
            <Chip
              color="success"
              variant="flat"
              className="text-bold text-small"
            >
              {cellValue}
            </Chip>
          </div>
        );
    }
  };

  return (
    <div className="w-full overflow-x-auto flex flex-row">
      <Table aria-label="Towing Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={Trims}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default TowingTable;
