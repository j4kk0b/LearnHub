function useAuth() {
  const auth = localStorage.getItem("auth");

  if (!auth) return false;

  if (auth.expires < new Date() / 1000) {
    return false;
  } else {
    return true;
  }
}

export default useAuth;
