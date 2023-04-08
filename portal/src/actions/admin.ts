import { useCallback, useMemo, useState } from "react";
import { useSafeQuery } from "../hooks/query";
import trpc from "../trpc";
import { UserProfile, UserProfileListFilter } from "../types";

function useAdminActionCreator() {
  const apiClient = trpc.useContext();
  const { safeQuery, loading, error, clearQuery } = useSafeQuery();
  const [userProfiles, setUserProfiles] = useState<UserProfile[] | null>([]);

  const fetchUserProfiles = useCallback(
    async (filter: UserProfileListFilter) => {
      const result = await safeQuery(() => apiClient.user.list.fetch(filter));
      setUserProfiles(
        result != null ? result.map((x) => x as UserProfile) : null
      );
    },
    [apiClient.user.list, safeQuery]
  );

  const createUser = useCallback(
    async (userProfile: UserProfile) => {
      const result = await safeQuery(() =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        apiClient.user.create.fetch(userProfile)
      );
      if (result != null) return true;
      return false;
    },
    [apiClient.user.create, safeQuery]
  );

  const editUser = useCallback(
    async (userProfile: UserProfile) => {
      const result = await safeQuery(() =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        apiClient.user.edit.fetch(userProfile)
      );
      if (result != null) return true;
      return false;
    },
    [apiClient.user.edit, safeQuery]
  );

  return useMemo(
    () => ({
      loading,
      error,
      userProfiles,
      clearQuery,
      fetchUserProfiles,
      createUser,
      editUser,
    }),
    [
      loading,
      error,
      userProfiles,
      clearQuery,
      fetchUserProfiles,
      createUser,
      editUser,
    ]
  );
}

export default useAdminActionCreator;