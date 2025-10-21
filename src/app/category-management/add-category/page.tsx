
import React, {useEffect, useState} from "react";
import {addToast, Form, Input} from "@heroui/react";
import BottomButtons from "@/components/bottom-buttons/BottomButtons.tsx";
import {getById, saveCategory, updateCategory} from "@/services/categoryService.ts";
import {useNavigate, useParams} from "react-router-dom";
import type {CategoryGetDTO} from "@/models/CategoryGetDTO.ts";
import type {CategorySaveDTO} from "@/models/CategorySaveDTO.ts";

const backUrl = "/admin-panel/category/view-category";

const AddCategory = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [category, setCategory] = useState('');
    const [isCategoryInvalid, setIsCategoryInvalid] = useState(false);

    // Retrieve category details if in edit mode (id is present)
    useEffect(() => {
        if (id){
            getById(parseInt(id)).then(res => {
                if (res.statusCode === 200) {
                    const categoryData: CategoryGetDTO = res.data;
                    setCategory(categoryData.name);
                }
            }).catch(err => {
                const backendResponse = err.response?.data;
                addToast({
                    title: "Error!",
                    description: backendResponse.message || "An error occurred while fetching category details.",
                    color: "danger",
                })
            });
        }
    }, [id]);

    // handle save
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Simple validation
        if (!category || category.trim() === '') {
            setIsCategoryInvalid(true);
            return;
        }

        // Prepare DTO
        const categorySaveDTO: CategorySaveDTO = {
            name: category,
        };

        if (!id){
            // Save new category
            saveCategory(categorySaveDTO).then(res => {
                if (res.statusCode === 201) {
                    addToast({
                        title: "Success!",
                        description: " Category added successfully.",
                        color: "success",
                    })
                    navigate(`${backUrl}`)
                }
            }).catch(err => {
                const backendResponse = err.response?.data;
                addToast({
                    title: "Error!",
                    description: backendResponse.message || "An error occurred while adding category.",
                    color: "danger",
                })
            });
        } else {
            // Update existing category
            updateCategory(parseInt(id), categorySaveDTO).then(res => {
                if (res.statusCode === 200) {
                    addToast({
                        title: "Success!",
                        description: "Category updated successfully.",
                        color: "success",
                    })
                    navigate(`${backUrl}`)
                }
            }).catch(err => {
                const backendResponse = err.response?.data;
                addToast({
                    title: "Error!",
                    description: backendResponse.message || "An error occurred while updating category.",
                    color: "danger",
                })
            });
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <Input
                label={"Category*"}
                labelPlacement="outside-top"
                type="text"
                placeholder="Enter Category"
                className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 focus:outline"
                errorMessage="Please enter a valid Category."
                isInvalid={isCategoryInvalid}
                value={category}
                onValueChange={(value) => {
                    setCategory(value);
                    if (value.trim() === '') {
                        setIsCategoryInvalid(true);
                    } else {
                        setIsCategoryInvalid(false);
                    }
                }}
            />

            {/*Save and back buttons*/}
            <BottomButtons backUrl={backUrl} mode={id ? 'edit' : 'new'}/>
        </Form>
    );
};

export default AddCategory;