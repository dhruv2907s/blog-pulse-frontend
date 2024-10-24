import axios from "axios";
export const getAllPostsOfUser = async (
    token,
    searchKeyword = "",
    page = 1,
    limit = 12
) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data, headers } = await axios.get(
            `http://localhost:8080/api/posts/manage?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`,
            config
        );
        return { data, headers };
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const getAllPosts = async () => {
    try {
        const { data } = await axios.get(`http://localhost:8080/api/posts`);
        return { data };
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const getSinglePosts = async ({ slug }) => {
    try {
        const { data } = await axios.get(`http://localhost:8080/api/posts/${slug}`);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};

export const deletePosts = async ({ slug, token }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.delete(`http://localhost:8080/api/posts/${slug}`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};

export const updatePosts = async ({ updatedData, slug, token }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.put(
            `http://localhost:8080/api/posts/${slug}`,
            updatedData,
            config
        );
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};

export const createPost = async ({ postData, token }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(`http://localhost:8080/api/posts/`, postData, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const soundPost = async (data) => {
    try {
        const config = {
            headers: {
                "X-RapidAPI-Key":
                    "5b73e136cfmsh8bf75048987ecefp1a5b72jsn3fca4e2f107f4",
                "X-RapidAPI-Host": "text-to-speech27.p.rapidapi.com",
            },
        };
        const { resData } = await axios.get(
            `http://localhost:8080/api/posts/${data?.slug}`,
            data,
            config
        );
        return resData;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const analyzePost = async (data) => {
    try {
        const config = {
            headers: {
                "content-type": "application/json",
                "X-RapidAPI-Key":
                    "5b73e136cfmsh8bf75048987ecefp1a5b72jsn3fca4e2107f4",
                "X-RapidAPI-Host": "webit-text-analytics.p.rapidapi.com",
            },
        };
        const { resData } = await axios.post(
            `http://localhost:8080/api/posts/${data.slug}`,
            data,
            config
        );
        return resData;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const getInsights = async (token, email) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`http://localhost:8080/api/posts/insights/${email}`, config);
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};
