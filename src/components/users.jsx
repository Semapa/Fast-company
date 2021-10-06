import React, { useState, useEffect } from 'react'
import Pagination from './pagination'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UserTable from './userTable'
import Loader from './UI/Loader/loader'
import TextField from './textField'
import { paginate } from '../utils/paginate'
import api from '../api/index'
import _ from 'lodash'

const Users = () => {
  const pageSize = 8
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data)
    })
  }, [])

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => userId !== user._id))
  }

  const handleToggleBookMark = (id) => {
    setUsers(
      users.filter((user) => {
        if (user._id === id) {
          user.bookmark = !user.bookmark
          return user
        }
        return user
      })
    )
  }

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  // Первый способ сбросить фильтр, добавить еще одну строку в список
  // НО ЭТО НЕ СРАБОТАЕТ ДЛЯ МАССИВОВ
  // Проще и лучше добавить Button с обработчиком
  // useEffect(() => {
  //   api.professions
  //     .fetchAll()
  //     .then((data) =>
  //       setProfession(
  //         Object.assign(data, { allProfession: { name: 'Все профессии' } })
  //       )
  //     )
  // }, [])

  const handleProfessionSelect = (item) => {
    setSearch('')
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    // принимаем объект
    setSortBy(item)
  }

  const handleSearchChange = ({ target }) => {
    setSelectedProf()
    setSearch(target.value)
  }
  // Смотрим есть ли фильтр у юзеров, если есть фильтруем массив,
  // нет возвращаем нефильтрованный массив

  // Для первого метода Проверяем если есть выбранный фильтр и у него есть id->отображаем, если нет id - значет это 'Все пользователи'
  // const filteredUsers =
  //   selectedProf && selectedProf._id
  //     ? allUsers.filter((user) => user.profession === selectedProf)
  //     : allUsers

  if (users) {
    const searchUsers = _.filter(users, (user) => {
      if (user.name.toLowerCase().includes(search.toLowerCase())) {
        return user
      }
    })

    const filteredUsers = selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : searchUsers
    const count = filteredUsers.length

    // для фильтрации используем lodash
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

    // Разбиваем основной массив c users на части
    // в соответствии с количеством user-ов на одной странице
    const usersCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
      setSelectedProf()
    }

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedProf}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          {count > 0 && (
            <>
              <TextField
                placeholder="Search"
                name="search"
                value={search}
                onChange={handleSearchChange}
              />
              <UserTable
                users={usersCrop}
                onSort={handleSort}
                selectedSort={sortBy}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
              />
            </>
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    )
  }
  return <Loader />
}

export default Users
