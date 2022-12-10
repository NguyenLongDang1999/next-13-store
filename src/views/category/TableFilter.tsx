// ** React Imports
import { useCallback, useEffect, useState, SyntheticEvent } from 'react'

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
import SearchFilter from 'src/views/category/SearchFilter'

// ** Utils Import
import { PAGE } from 'src/utils/enums'
import { OptionPopular, OptionStatus } from 'src/utils/funcs'
import { formatDate } from 'src/@core/utils/format'

// ** Components Imports
import SaveCategoryDialog from './SaveCategoryDialog'
import UploadImageCategory from './UploadImageCategory'
import Translations from 'src/layouts/components/Translations'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { fetchData } from 'src/store/apps/category'
import { CategorySearchType, CategoryType } from 'src/types/apps/categoryTypes'

interface CellType {
    row: CategoryType
}

const TableFilter = () => {
    // ** State
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState<number>(PAGE.SIZE)
    const [show, setShow] = useState<boolean>(false)
    const [upload, setUpload] = useState<boolean>(false)
    const [imageURL, setImageURL] = useState<string>('')
    const [id, setId] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<CategorySearchType>()

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.category)

    const showCategory = (id: string) => {
        setId(id)
        setShow(true)
    }

    const showUpload = ({ row }: CellType) => {
        setId(row.id)
        setImageURL(row.image_uri)
        setUpload(true)
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
                        <CustomAvatar
                            src={`https://storemee.b-cdn.net/category/${row.image_uri}`}
                            sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }}
                        />

                        <Link
                            underline='none'
                            href='#'
                            onClick={() => showCategory(row.id)}
                        >
                            <Typography
                                noWrap
                                variant='body2'
                                sx={{ color: 'text.primary', textTransform: 'capitalize', fontWeight: 600 }}
                            >
                                {row.name}
                            </Typography>
                        </Link>
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
                    <Tooltip title={<Translations text='Btn.View' />}>
                        <IconButton
                            size='small'
                            onClick={() => showCategory(row.id)}
                        >
                            <Icon
                                icon='mdi:eye-outline'
                                fontSize={20}
                            />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={<Translations text='Btn.View' />}>
                        <IconButton
                            size='small'
                            onClick={() => showUpload({ row })}
                        >
                            <Icon
                                icon='mdi:tray-arrow-up'
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
            dispatch(fetchData({ page, pageSize, search }))
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
                id={id}
                setId={setId}
            />

            <UploadImageCategory
                show={upload}
                setShow={setUpload}
                id={id}
                setId={setId}
            />
        </Card>
    )
}

export default TableFilter
