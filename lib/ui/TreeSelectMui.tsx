import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  ChipTypeMap,
  FormHelperText,
  IconButton,
  InputLabelProps,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material';
import React, { useState, useMemo, useEffect } from 'react';
import { TMenuItemOptionProps } from './SelectMui';

export const flattenCategoryTree = (tree: any[]): any[] => {
  const getChildrenNode = (obj) => {
    if (obj.hasOwnProperty('children_data')) {
      return [obj, obj.children_data.map(getChildrenNode).flat(Infinity)];
    }
    return obj;
  };

  if (Array.isArray(tree) && tree.length > 0) {
    return tree.map(getChildrenNode).flat(Infinity);
  }
  return [];
};

interface ITreeSelectMuiProps<
  VT,
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']
> extends Partial<
    AutocompleteProps<T, Multiple, DisableClearable, false, ChipComponent>
  > {
  defaultExpandAll?: boolean;
  defaultSelected?: any;
  error?: boolean;
  helperText?: string;
  initialLevel?: number;
  InputLabelProps?: Partial<InputLabelProps>;
  isStoreSelection?: boolean;
  label: string;
  labelKey?: string; // For Chip label
  name: string;
  nestedTree: INestedTree[];
  valueKey?: string; // For value generation
  onChange?: any;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  setValue: (name: string, value: VT | VT[] | string) => void;
  uniqueKey?: string; // For indexing ListItem
}

interface INestedTree {
  children_data: any[];
  level: number;

  [key: string]: any;
}

const TreeSelectMui = <
  VT,
  T extends TMenuItemOptionProps<VT>,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']
>(
  props: ITreeSelectMuiProps<VT, T, Multiple, DisableClearable, ChipComponent>
) => {
  const {
    nestedTree,
    defaultExpandAll,
    defaultSelected,
    error,
    helperText,
    isStoreSelection = false,
    label,
    labelKey = 'name',
    multiple,
    valueKey = 'id',
    setValue,
    uniqueKey = 'id',
    initialLevel = 1,
  } = props;

  const [isPopperOpen, setIsPopperOpen] = useState<boolean>(false);

  const treeOptions = useMemo(
    () => flattenCategoryTree(nestedTree),
    [nestedTree]
  );

  const rootParentKeys = useMemo(
    () =>
      treeOptions
        .filter(
          (tree) => 'children_data' in tree && tree.level === initialLevel
        )
        .map((tree) => tree[valueKey]),
    [initialLevel, treeOptions, valueKey]
  );

  const getDefaultValue = (): any[] | any | undefined => {
    if (defaultSelected && Array.isArray(defaultSelected) && multiple) {
      return treeOptions.filter((tree) =>
        [tree[valueKey], `${tree[valueKey]}`, Number(tree[valueKey])].some(
          (val) => defaultSelected.includes(val)
        )
      );
    }

    if (defaultSelected && !multiple) {
      return (
        treeOptions.find((tree) => tree[valueKey] === defaultSelected) ?? null
      );
    }

    if (!defaultSelected && multiple) {
      return [];
    }

    return null;
  };

  const getShouldParentExpand = () =>
    treeOptions
      .filter((node) => 'children_data' in node)
      .reduce(
        (prev, curr) => ({
          ...prev,
          [curr[valueKey]]: !!defaultExpandAll,
        }),
        {}
      );

  const [selected, setSelected] = useState<any[] | any | undefined>(
    getDefaultValue()
  );

  useEffect(() => {
    if (multiple) {
      setValue(
        props.name,
        selected.map((item) => item[valueKey])
      );
    } else {
      setValue(props.name, selected?.[valueKey] ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, treeOptions]);

  useEffect(() => {
    // Controlled component
    if (isStoreSelection) {
      setSelected(getDefaultValue());
    }
    if (defaultSelected && treeOptions) {
      setIsParentExpanded(getShouldParentExpand());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultSelected, treeOptions]);

  const [isParentExpanded, setIsParentExpanded] = useState<any>(
    getShouldParentExpand()
  );

  const getChildrenKeyByParentKey = (parentKey: any) =>
    treeOptions
      .find(
        (option) =>
          option[valueKey] === parentKey ||
          option[valueKey] === Number(parentKey)
      )
      ?.children_data.map((child) => child[valueKey]);

  const getDescendantsByParentKey = (parentKey: any) =>
    flattenCategoryTree(
      treeOptions.filter(
        (option) =>
          option[valueKey] === parentKey ||
          option[valueKey] === Number(parentKey)
      )
    ).map((child) => child[valueKey]);

  const filterOptions = useMemo(() => {
    let shouldExpandKeys: string[] = rootParentKeys;
    Object.entries(isParentExpanded).forEach(([key, value]) => {
      if (value === true) {
        shouldExpandKeys = shouldExpandKeys.concat(
          getChildrenKeyByParentKey(key)
        );
      }
    });
    return treeOptions.filter((option) =>
      shouldExpandKeys.includes(option[valueKey])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isParentExpanded, rootParentKeys, treeOptions, valueKey]);

  const handlePopperClose = () => {
    setIsPopperOpen(false);
  };

  const handlePopperOpen = () => {
    setIsPopperOpen(true);
  };

  const handleToggleExpand = (option) => {
    const childrenKeys = getDescendantsByParentKey(option[valueKey]);
    setIsParentExpanded((prev) => {
      // If parent is currently true, it means this toggle will be false, so children also need to be false
      let childrenConfig = {};
      if (prev[option[valueKey]] === true) {
        childrenConfig = childrenKeys.reduce(
          (p, childKey) => ({
            ...p,
            [childKey]: false,
          }),
          {}
        );
      }
      return {
        ...prev,
        [option[valueKey]]: !prev[option[valueKey]],
        ...childrenConfig,
      };
    });
  };

  const handleSetValue = (event, option: any) => {
    if (option === null && multiple) {
      setSelected([]);
    } else if (option === null) {
      // handle single select
      setSelected(null);
    } else if (Array.isArray(option)) {
      // handle multiple selection
      setSelected(option);
    } else if (multiple) {
      // handle multiple with defaultSelected
      setSelected((prev: any[]) => [...prev, option]);
    } else {
      // handle single Select
      setSelected(option);
    }
    handlePopperClose();
  };

  const getOptionLabel = (node) => {
    return node[labelKey] ?? '';
  };

  const isOptionEqualToValue = (option, value) => {
    return option?.[valueKey] === value?.[valueKey];
  };

  return (
    <>
      <Autocomplete
        filterOptions={() => filterOptions}
        getOptionDisabled={(option) => option.disabled}
        getOptionLabel={getOptionLabel}
        fullWidth
        key="tree-select-mui"
        isOptionEqualToValue={isOptionEqualToValue}
        onChange={handleSetValue}
        open={isPopperOpen}
        onClose={handlePopperClose}
        onOpen={handlePopperOpen}
        renderOption={({ onClick, ...props }, option) => {
          const hasChildren =
            'children_data' in option &&
            Array.isArray(option.children_data) &&
            option.children_data.length > 0;

          return (
            <ListItem component="div" key={`list-item-${option[uniqueKey]}`}>
              <div style={{ display: 'flex', width: '90%' }}>
                <div style={{ flexGrow: 0.1 * option.level }}></div>
                {hasChildren && (
                  <IconButton onClick={() => handleToggleExpand(option)}>
                    {isParentExpanded[option[valueKey]] ? (
                      <ExpandMoreIcon />
                    ) : (
                      <ChevronRightIcon />
                    )}
                  </IconButton>
                )}
                <ListItemButton
                  component="li"
                  dense
                  key={`list-item-button-${option[uniqueKey]}`}
                  onClick={(event) => {
                    handleSetValue(event, option);
                  }}
                  {...props}
                >
                  <ListItemText>{option[labelKey]}</ListItemText>
                </ListItemButton>
              </div>
            </ListItem>
          );
        }}
        loading
        multiple={multiple}
        options={treeOptions}
        size="small"
        renderInput={(params) => (
          <TextField
            label={label}
            margin="normal"
            name={props.name}
            {...params}
            InputLabelProps={props.InputLabelProps}
          />
        )}
        value={selected}
      />
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </>
  );
};

export default TreeSelectMui;
