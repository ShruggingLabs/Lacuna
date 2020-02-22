import * as React from "react"
import ReactDataGrid from "react-data-grid"
import { Dialog, Pane } from "evergreen-ui"

import Store from "#state"
import { observer } from "mobx-react"

export const ProjectDatasetManager = observer((props) => {
  const [dataset, setDataset] = React.useState({ rows: Store.projectDatasetJson })
  const [columns, setColumns] = React.useState()

  React.useEffect(() => {
    setColumns(() => {
      return Object.keys(dataset.rows[0]).reduce((final, key) => {
        final.push({
          key,
          name: key,
          editable: true,
          sortable: true,
          resizable: true,
          width: 100
        })
        return final
      }, [])
    })
  }, [])

  const updateRows = ({ fromRow, toRow, updated }) => {
    setDataset((state) => {
      const rows = state.rows.slice()
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated }
      }
      return { rows }
    })
  }

  return (
    <Pane>
      <Dialog
        isShown
        title='Manage Project Dataset'
        className='FUCKING_DIALOG'
        style={{ position: "absolute", top: 200, left: 200 }}
        onCloseComplete={() => Store.toggleDatasetManager(false)}
        hasFooter={false}
        width='90vw'
        height='90vh'
        minHeightContent={600}
        preventBodyScrolling
      >
        <If condition={!dataset.rows || !columns}>
          <p>WAITING...</p>
        </If>
        <If condition={dataset.rows && columns}>
          <ReactDataGrid
            columns={columns}
            rowGetter={(i) => dataset.rows[i]}
            rowsCount={dataset.rows.length}
            onGridRowsUpdated={console.log}
            enableCellSelect={true}
            minHeight={600}
          />
        </If>
      </Dialog>
    </Pane>
  )
})
