import { DataGrid, DataGridProps, GridDensityTypes } from '@mui/x-data-grid';

interface IDataGridMui extends DataGridProps {
  height?: string;
}

const DataGridMui = (props: IDataGridMui) => {
  const { columns, height, rows, ...others } = props;
  return (
    <div style={{ height: height ?? '500px' }}>
      <DataGrid
        columns={columns}
        density={GridDensityTypes.Comfortable}
        disableSelectionOnClick
        pageSize={5}
        rows={rows}
        rowsPerPageOptions={[5]}
        {...others}
      />
    </div>
  );
};

export default DataGridMui;
