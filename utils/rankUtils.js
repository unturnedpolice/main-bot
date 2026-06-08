function getMemberRank(member, serverConfig) {
  if (!member || !member.roles || !member.roles.cache) {
    return null;
  }

  if (!serverConfig || !Array.isArray(serverConfig.ranks)) {
    return null;
  }

  const memberRoleIds = member.roles.cache.map((role) => role.id);

  const matchedRanks = serverConfig.ranks.filter((rank) => {
    return memberRoleIds.includes(rank.rankRoleId);
  });

  if (matchedRanks.length === 0) {
    return null;
  }

  matchedRanks.sort((a, b) => b.level - a.level);

  return matchedRanks[0];
}

function getRankByName(rankName, serverConfig) {
  if (!rankName || !serverConfig || !Array.isArray(serverConfig.ranks)) {
    return null;
  }

  return serverConfig.ranks.find((rank) => {
    return rank.name.toLowerCase() === rankName.toLowerCase();
  }) || null;
}

function getRankByLevel(level, serverConfig) {
  if (!serverConfig || !Array.isArray(serverConfig.ranks)) {
    return null;
  }

  return serverConfig.ranks.find((rank) => {
    return rank.level === level;
  }) || null;
}

function getNextHigherRanks(currentRank, serverConfig) {
  if (!currentRank || !serverConfig || !Array.isArray(serverConfig.ranks)) {
    return [];
  }

  return serverConfig.ranks
    .filter((rank) => rank.level > currentRank.level)
    .sort((a, b) => a.level - b.level);
}

function getNextLowerRanks(currentRank, serverConfig) {
  if (!currentRank || !serverConfig || !Array.isArray(serverConfig.ranks)) {
    return [];
  }

  return serverConfig.ranks
    .filter((rank) => rank.level < currentRank.level)
    .sort((a, b) => b.level - a.level);
}

module.exports = {
  getMemberRank,
  getRankByName,
  getRankByLevel,
  getNextHigherRanks,
  getNextLowerRanks
};