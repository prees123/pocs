import map from 'lodash/map'

export function isMemberOf (membership, group) {
  if (!membership) {
    return null
  }
  return membership.some(item => item.toUpperCase() === group.toUpperCase())
}

export function formatGroup (ldapString) {
  const adGroups = []
  map(ldapString, (group) => {
    const line = group.split(',')
    line.forEach((item) => {
      if (item.includes('CN=')) {
        const commonName = item.split('CN=')[1]
        adGroups.push(commonName)
      }
    })
  })
  return adGroups
}

export function formatUserInfo (userInfo) {
  return {
    email: userInfo.mail,
    firstName: userInfo.firstname,
    fullName: `${userInfo.firstname} ${userInfo.lastname}`,
    lanId: userInfo.samaccountname,
    lastName: userInfo.lastname,
    memberOf: formatGroup(userInfo.memberof),
    accessToken: userInfo.accessToken,
  }
}
