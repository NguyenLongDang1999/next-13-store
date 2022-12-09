// ** React Imports
import { useCallback, useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Utils Import
import { PAGE } from 'src/utils/enums'
import { OptionPopular, OptionStatus } from 'src/utils/funcs'
import { formatDate } from 'src/@core/utils/format'
import { CategoryType } from 'src/types/apps/categoryTypes'

// ** Components Imports
import SaveCategoryDialog from './SaveCategoryDialog'
import Translations from 'src/layouts/components/Translations'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { fetchData } from 'src/store/apps/category'
import { useSelector } from 'react-redux'

interface CellType {
    row: CategoryType
}

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
    const { row } = params
    const stateNum = Math.floor(Math.random() * 6)
    const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
    const color = states[stateNum]

    if (row.image_uri) {
        return <CustomAvatar
            src={`https://storemee.b-cdn.net/category/${row.image_uri}`}
            sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }}
        />
    } else {
        return (
            <CustomAvatar
                skin='light'
                color={color as ThemeColor}
                sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
            />
        )

    }
}

const columns: GridColumns = [
    {
        flex: 0.25,
        minWidth: 290,
        field: 'name',
        sortable: false,
        filterable: false,
        renderHeader: () => (
            <div className="MuiDataGrid-columnHeaderTitle text-column-header">
                <Translations text='Category.Title' />
            </div>
        ),
        renderCell: (params: GridRenderCellParams) => {
            const { row } = params

            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {renderClient(params)}

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                            noWrap
                            variant='body2'
                            sx={{ color: 'text.primary', textTransform: 'capitalize', fontWeight: 600 }}
                        >
                            {row.name}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.175,
        minWidth: 120,
        field: 'parentCategory',
        sortable: false,
        filterable: false,
        renderHeader: () => (
            <div className="MuiDataGrid-columnHeaderTitle text-column-header">
                <Translations text='Category.Name' />
            </div>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Typography
                variant='body2'
                sx={{ color: 'text.primary', textTransform: 'capitalize' }}
            >
                {params.row.parentCategory?.name}
            </Typography>
        )
    },
    {
        flex: 0.175,
        minWidth: 140,
        field: 'status',
        sortable: false,
        filterable: false,
        renderHeader: () => (
            <div className="MuiDataGrid-columnHeaderTitle text-column-header">
                <Translations text='Status' />
            </div>
        ),
        renderCell: (params: GridRenderCellParams) => {
            const status = OptionStatus[params.row.status]

            return (
                status &&
                <CustomAvatar
                    skin='light'
                    color={status.color}
                    sx={{ width: '1.875rem', height: '1.875rem' }}
                >
                    <Icon
                        icon={status.icon}
                        fontSize='1rem'
                    />
                </CustomAvatar>
            )
        }
    },
    {
        flex: 0.175,
        minWidth: 140,
        field: 'popular',
        sortable: false,
        filterable: false,
        renderHeader: () => (
            <div className="MuiDataGrid-columnHeaderTitle text-column-header">
                <Translations text='Popular' />
            </div>
        ),
        renderCell: (params: GridRenderCellParams) => {
            const popular = OptionPopular[params.row.popular]

            return (
                popular &&
                <CustomAvatar
                    skin='light'
                    color={popular.color}
                    sx={{ width: '1.875rem', height: '1.875rem' }}
                >
                    <Icon
                        icon={popular.icon}
                        fontSize='1rem'
                    />
                </CustomAvatar>
            )
        }
    },
    {
        flex: 0.175,
        minWidth: 120,
        field: 'created_at',
        sortable: false,
        filterable: false,
        renderHeader: () => (
            <div className="MuiDataGrid-columnHeaderTitle text-column-header">
                <Translations text='Created_at' />
            </div>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Typography
                variant='body2'
                sx={{ color: 'text.primary' }}
            >
                {formatDate(params.row.created_at)}
            </Typography>
        )
    },
    {
        flex: 0.175,
        minWidth: 120,
        field: 'updated_at',
        sortable: false,
        filterable: false,
        renderHeader: () => (
            <div className="MuiDataGrid-columnHeaderTitle text-column-header">
                <Translations text='Updated_at' />
            </div>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Typography
                variant='body2'
                sx={{ color: 'text.primary' }}
            >
                {formatDate(params.row.updated_at)}
            </Typography>
        )
    },
    {
        flex: 0.1,
        minWidth: 130,
        field: 'actions',
        sortable: false,
        filterable: false,
        renderHeader: () => (
            <div className="MuiDataGrid-columnHeaderTitle text-column-header">
                <Translations text='Action' />
            </div>
        ),
        renderCell: ({ row }: CellType) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title='View'>
                    <IconButton
                        size='small'
                        component={Link}
                        href={`/apps/invoice/preview/${row.id}`}
                    >
                        <Icon
                            icon='mdi:eye-outline'
                            fontSize={20}
                        />
                    </IconButton>
                </Tooltip>

                <Tooltip title='Delete Invoice'>
                    <IconButton size='small'>
                        <Icon
                            icon='mdi:delete-outline'
                            fontSize={20}
                        />
                    </IconButton>
                </Tooltip>
            </Box>
        )
    }
]

const TableFilter = () => {
    // ** State
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState<number>(PAGE.SIZE)
    const [show, setShow] = useState<boolean>(false)

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.category)

    const fetchTableData = useCallback(
        async () => {
            dispatch(fetchData({ page, pageSize }))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [page, pageSize]
    )

    useEffect(() => {
        fetchTableData()
    }, [fetchTableData])


    return (
        <Card>
            <Button
                variant='contained'
                startIcon={<Icon icon='mdi:plus' />}
                onClick={() => setShow(true)}
            >
                <Translations text='Btn.Create' />
            </Button>

            <DataGrid
                autoHeight
                pagination
                rows={store.categoryList ?? []}
                rowCount={store.categoryTotal ?? 0}
                columns={columns}
                pageSize={pageSize}
                paginationMode='server'
                onPageChange={newPage => setPage(newPage)}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            />

            <SaveCategoryDialog
                show={show}
                setShow={setShow}
            />
        </Card>
    )
}

export default TableFilter
