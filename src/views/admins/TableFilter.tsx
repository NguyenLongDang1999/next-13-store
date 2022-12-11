// ** React Imports
import { useCallback, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Divider from '@mui/material/Divider'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Demo Components Imports
import SearchFilter from 'src/views/admins/SearchFilter'

// ** Utils Import
import { PAGE } from 'src/utils/enums'
import { formatDate } from 'src/@core/utils/format'

// ** Components Imports
import SaveAdminDialog from './SaveAdminDialog'
import Translations from 'src/layouts/components/Translations'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { fetchData } from 'src/store/apps/admins'
import { AdminSearchType, AdminType } from 'src/types/apps/AdminTypes'

interface CellType {
    row: AdminType
}

const TableFilter = () => {
    // ** State
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState<number>(PAGE.SIZE)
    const [show, setShow] = useState<boolean>(false)
    const [id, setId] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<AdminSearchType>()

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.admins)

    const showAdmin = (id: string) => {
        setId(id)
        setShow(true)
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
                    <Translations text='Info' />
                </div>
            ),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomAvatar
                            src={`https://storemee.b-cdn.net/admins/${row.image_uri}`}
                            sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }}
                        />

                        <Link
                            underline='none'
                            href='#'
                            onClick={() => showAdmin(row.id)}
                        >
                            <Typography
                                noWrap
                                variant='body2'
                                sx={{ color: 'text.primary', textTransform: 'capitalize', fontWeight: 600 }}
                            >
                                {row.name}
                            </Typography>

                            <Typography
                                noWrap
                                variant='caption'
                            >
                                {row.phone}
                            </Typography>
                        </Link>
                    </Box>
                )
            }
        },
        {
            flex: 0.175,
            minWidth: 120,
            field: 'email',
            sortable: false,
            filterable: false,
            renderHeader: () => (
                <div className="MuiDataGrid-columnHeaderTitle text-column-header">
                    <Translations text='Users.Email' />
                </div>
            ),
            renderCell: (params: GridRenderCellParams) => (
                <Typography
                    variant='body2'
                    sx={{ color: 'text.primary', textTransform: 'capitalize' }}
                >
                    {params.row.email}
                </Typography>
            )
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
                    <Tooltip title={<Translations text='Btn.View' />}>
                        <IconButton
                            size='small'
                            onClick={() => showAdmin(row.id)}
                        >
                            <Icon
                                icon='mdi:eye-outline'
                                fontSize={20}
                            />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={<Translations text='Btn.Delete' />}>
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

    const fetchTableData = useCallback(
        async () => {
            dispatch(fetchData({ page, pageSize }))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [page, pageSize, search]
    )

    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            fetchTableData()
            setLoading(false)
        }, Math.random() * 1000 + 250)
    }, [fetchTableData])

    return (
        <Card>
            <CardContent>
                <SearchFilter setSearch={setSearch} />
            </CardContent>

            <Divider />

            <CardContent>
                <Button
                    variant='contained'
                    startIcon={<Icon icon='mdi:plus' />}
                    onClick={() => setShow(true)}
                >
                    <Translations text='Btn.Create' />
                </Button>
            </CardContent>

            <DataGrid
                autoHeight
                pagination
                loading={loading}
                rows={store.adminList ?? []}
                rowCount={store.adminTotal ?? 0}
                columns={columns}
                pageSize={pageSize}
                paginationMode='server'
                onPageChange={newPage => setPage(newPage)}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            />

            <SaveAdminDialog
                show={show}
                setShow={setShow}
                id={id}
                setId={setId}
            />
        </Card>
    )
}

export default TableFilter
